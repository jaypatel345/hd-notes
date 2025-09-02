// src/routes/auth.ts
import express from 'express';
import { body } from 'express-validator';
import {
  signup,
  verifyOTP,
  signin,
  googleAuth,
  resendOTP,
  requestLoginOTP
} from '../controllers/authController';

const router = express.Router();

// Validation middleware
const signupValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Please provide a valid date of birth')
];

const signinValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
];

const otpValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/verify-otp', otpValidation, verifyOTP);
router.post('/signin', signinValidation, signin);
router.post('/google', googleAuth);
// Google OAuth callback route
router.get('/google/callback', googleAuth);
router.post('/resend-otp', [body('email').isEmail().normalizeEmail()], resendOTP);
router.post('/request-login-otp', [body('email').isEmail().normalizeEmail()], requestLoginOTP);

export default router;
