import { useState } from "react";
import HDLogo from "./HDLogo";
import { Eye, EyeClosed } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (data: any) => void;
  onSwitchToSignIn: () => void;
}

const SignUpForm = ({ onSubmit, onSwitchToSignIn }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    otp: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showOTPValue, setShowOTPValue] = useState(false);

  const toggleOTPVisibility = () => {
    setShowOTPValue((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (showOTP && !formData.otp.trim()) newErrors.otp = "OTP is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOTP = () => {
    if (validateForm()) {
      setShowOTP(true);
      alert("OTP sent to your email!");
    }
  };

  const handleSignUp = () => {
    if (validateForm()) onSubmit(formData);
  };

  return (
    <div className="w-full max-w-[527px] min-h-screen p-6 sm:p-16 flex flex-col mx-auto justify-center">
      <div className="flex justify-center mb-8">
        <HDLogo />
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <h1
          className="font-bold text-[#232323] mb-2 text-[28px] sm:text-[40px] text-shadow-black text-center sm:text-left"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Sign up
        </h1>
        <p className="mb-8 text-[16px] sm:text-[18px] text-[#969696] text-center sm:text-left">
          Sign up to enjoy the feature of HD
        </p>

        <div className="space-y-8 relative">
          {/* Full Name */}
          <div>
            <label className="block text-[12px] text-[#969696] mb-1 absolute left-2.5 -top-2.5 px-1  bg-white">
              Full name
            </label>
            <input
              type="text"
              placeholder="Jonas Kahnwald"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3 py-3 border border-[#E6E6E6] rounded-lg text-[16px]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* DOB */}
          <div className="relative">
            <label className="block text-[12px] text-[#969696] mb-1 absolute left-2.5 -top-2.5 px-1 z-10  bg-white">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full px-3 py-3 border border-[#E6E6E6] rounded-lg text-[16px]"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-[14px] text-[#969696] mb-1 absolute left-2.5 -top-2.5 px-1 z-10  bg-white">
              Email
            </label>
            <input
              type="email"
              placeholder="jonas_kahnwald@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-3 border border-[#E6E6E6] rounded-lg text-[16px]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {showOTP && (
            <div className="relative">
              <label className="block text-[14px] text-[#969696] mb-1 absolute left-2.5 -top-2.5 px-1 z-10 bg-white">
                OTP
              </label>
              <div className="relative">
                <input
                  type={showOTPValue ? "text" : "password"}
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg text-[16px]"
                />

                {showOTPValue ? (
                  <EyeClosed
                    onClick={toggleOTPVisibility}
                    className="absolute right-3 top-3 w-5 h-5 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={toggleOTPVisibility}
                    className="absolute right-3 top-3 w-5 h-5 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          {!showOTP ? (
            <button
              onClick={handleGetOTP}
              className="w-full bg-[#1677FF] text-white py-3 rounded-lg font-medium hover:bg-[#1666dd] transition-colors"
            >
              Get OTP
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="w-full bg-[#1677FF] text-white py-3 rounded-lg font-medium hover:bg-[#1666dd] transition-colors"
            >
              Sign up
            </button>
          )}

          <div className="text-center text-[14px] text-[#969696]">
            <span>Already have an account? </span>
            <button
              onClick={onSwitchToSignIn}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
