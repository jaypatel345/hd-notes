import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { User, IUser } from '../models/User';
import { sendOTPEmail } from '../services/emailService';
import { verifyGoogleToken } from '../services/googleService';
import { Types } from 'mongoose';

// Generate JWT token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE as jwt.SignOptions["expiresIn"]) || "7d"
  };

  return jwt.sign({ userId }, secret, options);
};

// Generate OTP
const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user: IUser;
    if (existingUser ) {
      // Update existing unverified user
      user = existingUser;
      user.name = name;
      user.dateOfBirth = new Date(dateOfBirth);
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      // Create new user
      user = new User({
        name,
        email,
        dateOfBirth: new Date(dateOfBirth),
        otp,
        otpExpires
      });
    }

    await user.save();

    // Send OTP email
    await sendOTPEmail(email, name, otp);

    res.status(201).json({
      success: true,
      message: 'OTP sent to your email. Please verify to complete registration.',
      data: {
        email,
        otpSent: true
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP and expiration
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Mark user as verified & clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken((user._id as Types.ObjectId).toString());

    return res.json({
      success: true,
      message: "Account verified successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, otp } = req.body;

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // For demo purposes, we're using OTP for signin as well
    // In production, you might want to use password or send a new OTP
    if (user.otp && user.otp === otp && user.otpExpires && user.otpExpires > new Date()) {
      const token = generateToken((user._id as Types.ObjectId).toString());

      res.json({
        success: true,
        message: 'Signed in successfully',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
export const requestLoginOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or not verified'
      });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTPEmail(email, user.name, otp);

    res.json({
      success: true,
      message: 'Login OTP sent to your email'
    });
  } catch (error) {
    console.error('Login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const googleUser = await verifyGoogleToken(credential);
    if (!googleUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Google token'
      });
    }

    let user = await User.findOne({ email: googleUser.email });
    
    if (!user) {
      // Create new user from Google data
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        dateOfBirth: new Date('1990-01-01'), // Default date for Google users
        googleId: googleUser.sub,
        isVerified: true
      });
      await user.save();
    } else if (!user.googleId) {
      // Link existing account with Google
      user.googleId = googleUser.sub;
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken((user._id as Types.ObjectId).toString());

    res.json({
      success: true,
      message: 'Google authentication successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth
        }
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already verified'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, user.name, otp);

    res.json({
      success: true,
      message: 'New OTP sent to your email'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};