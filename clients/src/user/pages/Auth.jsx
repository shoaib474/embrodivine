import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Heart,
  Crown,
} from "lucide-react";
import { useLogin, useRegister } from "../../hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();
  const { mutate: userRegister, isPending: isRegisterPending } = useRegister();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const benefits = [
    { icon: ShoppingBag, text: "Track your orders easily" },
    { icon: Heart, text: "Save your favorite designs" },
    { icon: Crown, text: "Exclusive member discounts" },
    { icon: Sparkles, text: "Early access to new collections" },
  ];

  const onLogin = async (data) => {
    login(data);
  };

  const onSignup = (data) => {
    userRegister(data, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  // ── Email Verification Success Screen ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
          </div>

          <h2 className="text-4xl font-bold text-[#222222]">
            Account Created!
          </h2>

          <p className="text-[#4B5563] text-lg leading-relaxed">
            Your account has been created successfully 🎉 We've sent a
            verification email to your inbox. Please verify your email to
            activate your account before continuing.
          </p>

          <p className="text-[#6B7280] text-sm">
            Didn't receive the email? Check your spam folder or request a new
            verification email.
          </p>

          <button
            onClick={() => (window.location.href = "/auth")}
            className="w-full px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#007BFF]/30"
          >
            Go To Login After Verification
          </button>
        </div>
      </div>
    );
  }

  // ── Main Auth Page ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-24">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 bg-[#007BFF] rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#007BFF] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* ══════════ LEFT — Branding & Benefits ══════════ */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-[#222222] mb-4">
                Welcome to
                <span className="block text-[#007BFF]">Embrodivine</span>
              </h1>
              <p className="text-[#007BFF]/80 text-lg leading-relaxed">
                Your premier destination for custom embroidered patches and
                premium embroidery services.
              </p>
            </div>

            <div className="bg-white border border-[#007BFF]/20 rounded-2xl p-8 space-y-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#222222]">
                Member Benefits
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="w-12 h-12 bg-[#007BFF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#007BFF]" />
                      </div>
                      <span className="text-[#333333] font-medium">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Decorative rule */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-[#007BFF]/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#007BFF]/30" />
                <div className="h-px flex-1 bg-[#007BFF]/10" />
              </div>

              <p className="text-[#333333]/50 text-sm text-center">
                Join thousands of embroidery enthusiasts today
              </p>
            </div>
          </div>

          {/* ══════════ RIGHT — Auth Form ══════════ */}
          <div className="bg-white rounded-2xl border border-[#007BFF]/20 p-6 sm:p-8 shadow-xl">
            {/* Mobile brand header */}
            <div className="lg:hidden text-center mb-6">
              <h1 className="text-2xl font-bold text-[#222222]">
                Welcome to <span className="text-[#007BFF]">Embrodivine</span>
              </h1>
            </div>

            {/* ── Toggle Tabs ── */}
            <div className="flex gap-2 mb-8 bg-[#F5F7FA] p-1 rounded-xl border border-[#007BFF]/10">
              <button
                onClick={switchMode}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin
                    ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/30"
                    : "text-[#007BFF] hover:bg-[#007BFF]/10"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={switchMode}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin
                    ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/30"
                    : "text-[#007BFF] hover:bg-[#007BFF]/10"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#007BFF]/10" />
              <div className="flex-1 h-px bg-[#007BFF]/10" />
            </div>

            {/* ══════════ LOGIN FORM ══════════ */}
            {isLogin ? (
              <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email",
                        },
                      })}
                      placeholder="your.email@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.email ? "border-red-500" : "border-[#007BFF]/30"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#007BFF]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#007BFF]/60 hover:text-[#007BFF] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-[#007BFF] bg-[#F5F7FA] border border-[#007BFF]/30 rounded cursor-pointer"
                    />
                    <span className="text-[#007BFF]/80 text-sm group-hover:text-[#007BFF] transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[#007BFF] text-sm font-semibold hover:text-[#0066CC] hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold
                    hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105
                    active:scale-95 flex items-center justify-center gap-2 mt-6
                    shadow-lg shadow-[#007BFF]/20
                    ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isPending ? "Signing In..." : "Sign In"}
                  {!isPending && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-[#333333]/50 text-sm text-center pt-2">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-[#007BFF] font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              /* ══════════ SIGNUP FORM ══════════ */
              <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.name ? "border-red-500" : "border-[#007BFF]/30"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email",
                        },
                      })}
                      placeholder="your.email@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.email ? "border-red-500" : "border-[#007BFF]/30"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password required",
                        minLength: { value: 8, message: "Min 8 characters" },
                      })}
                      placeholder="Create a strong password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#007BFF]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#007BFF]/60 hover:text-[#007BFF] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Passwords do not match",
                      })}
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#007BFF]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#007BFF]/60 hover:text-[#007BFF] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isRegisterPending}
                  className={`w-full px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold
                    hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105
                    active:scale-95 flex items-center justify-center gap-2 mt-6
                    shadow-lg shadow-[#007BFF]/20
                    ${isRegisterPending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isRegisterPending ? "Creating Account..." : "Create Account"}
                  {!isRegisterPending && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-[#007BFF]/70 text-xs text-center mt-4">
                  By signing up, you agree to our{" "}
                  <Link
                    to="/term-conditions"
                    className="text-[#007BFF] font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </p>

                <p className="text-[#333333]/50 text-sm text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-[#007BFF] font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
