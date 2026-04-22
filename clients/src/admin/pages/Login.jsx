import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (isLocked) return;
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API}/auth/login`, // backend login route
        formData,
        {
          withCredentials: true, // important for cookies
        }
      );

      const { user } = res.data;

      if (user.role !== "admin") {
        setErrors({ general: "Access denied: Admins only" });
        setIsLoading(false);
        return;
      }

      // cookie automatically set by backend (HTTP-only)
      setLoginSuccess(true);
      setIsLoading(false);

      // optionally redirect after login
      setTimeout(() => {
        window.location.href = "/admin"; // redirect to admin dashboard
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setLoginAttempts((prev) => prev + 1);

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Server error. Please try again later." });
      }

      if (loginAttempts + 1 >= 3) {
        setIsLocked(true);
        setErrors({
          general: "Too many failed attempts. Account locked for 15 minutes.",
        });
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttempts(0);
        }, 900000); // 15 min
      }
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general)
      setErrors((prev) => ({ ...prev, [field]: "", general: "" }));
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <CheckCircle2
              className="w-12 h-12 text-[#101010]"
              strokeWidth={3}
            />
          </div>
          <h2 className="text-4xl font-bold text-[#E8D7B5]">
            Login Successful!
          </h2>
          <p className="text-[#D4AF37]/80 text-lg leading-relaxed">
            Welcome back, Admin. Redirecting to dashboard...
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full backdrop-blur-sm">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-[#D4AF37] font-semibold">
                  Secure Admin Access
                </span>
              </div>
              <h1 className="text-5xl font-bold text-[#E8D7B5]">
                Admin Portal
                <span className="block text-[#D4AF37] mt-2">PatchShop</span>
              </h1>
              <p className="text-[#D4AF37]/80 text-lg leading-relaxed">
                Manage your embroidery business with powerful admin tools and
                real-time insights.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-[#E8D7B5]">
                Admin Features
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Secure encrypted authentication" },
                  { icon: Lock, text: "Role-based access control" },
                  { icon: KeyRound, text: "Two-factor authentication" },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <span className="text-[#E8D7B5]">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-8 sm:p-10 shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#101010]" />
              </div>
              <h2 className="text-3xl font-bold text-[#E8D7B5] mb-2">
                Admin Login
              </h2>
              <p className="text-[#D4AF37]/70">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div
                className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-shake ${
                  isLocked
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-yellow-500/10 border-yellow-500/30"
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 flex-shrink-0 ${
                    isLocked ? "text-red-500" : "text-yellow-500"
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold ${
                      isLocked ? "text-red-500" : "text-yellow-500"
                    }`}
                  >
                    {isLocked ? "Account Locked" : "Authentication Failed"}
                  </p>
                  <p className="text-[#E8D7B5] text-sm mt-1">
                    {errors.general}
                  </p>
                </div>
              </div>
            )}

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && !isLocked && (
              <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-500 text-sm text-center">
                  Failed attempts: {loginAttempts}/3
                </p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    disabled={isLocked}
                    placeholder="admin@patchshop.com"
                    className={`w-full pl-10 pr-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#D4AF37]/30 focus:border-[#D4AF37]"
                    } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    disabled={isLocked}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none transition-colors ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#D4AF37]/30 focus:border-[#D4AF37]"
                    } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLocked}
                      className="w-5 h-5 bg-[#101010] border border-[#D4AF37]/30 rounded cursor-pointer appearance-none checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-all disabled:opacity-50"
                    />
                    {rememberMe && (
                      <CheckCircle2
                        className="w-3 h-3 text-[#101010] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span className="text-[#D4AF37]/80 text-sm group-hover:text-[#D4AF37] transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[#D4AF37] text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLocked || isLoading}
                className="w-full px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#101010] border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="w-5 h-5" />
                    Account Locked
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
              <div className="flex items-start gap-3 text-xs text-[#D4AF37]/60">
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  This is a secure admin area. All login attempts are monitored
                  and logged. Unauthorized access attempts will be reported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
