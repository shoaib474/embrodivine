import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

    navigate("/dashboard");
  };

  const onSignup = (data) => {
    userRegister(data, {
      onSuccess: (res) => {
        setSubmitted(true);

        // role-based redirect
        if (res.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      },
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <CheckCircle2
              className="w-12 h-12 text-[#101010]"
              strokeWidth={3}
            />
          </div>
          <h2 className="text-4xl font-bold text-[#E8D7B5]">
            {isLogin ? "Welcome Back!" : "Account Created!"}
          </h2>
          <p className="text-yellow-500/80 text-lg leading-relaxed">
            {isLogin
              ? "You have successfully logged in to your account."
              : "Your account has been created successfully. Welcome to PatchShop!"}
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full px-8 py-4 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/30"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl font-bold text-[#E8D7B5] mb-4">
                Welcome to
                <span className="block text-yellow-500">PatchShop</span>
              </h1>
              <p className="text-yellow-500/80 text-lg leading-relaxed">
                Your premier destination for custom embroidered patches and
                premium embroidery services.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-yellow-500/20 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-[#E8D7B5]">
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
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-yellow-500" />
                      </div>
                      <span className="text-[#E8D7B5]">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-yellow-500/20 p-6 sm:p-8 shadow-2xl animate-fade-in">
            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-8 bg-[#101010] p-1 rounded-lg">
              <button
                onClick={() => switchMode()}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin
                    ? "bg-yellow-500 text-[#101010] shadow-lg shadow-yellow-500/30"
                    : "text-yellow-500 hover:bg-yellow-500/10"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode()}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin
                    ? "bg-yellow-500 text-[#101010] shadow-lg shadow-yellow-500/30"
                    : "text-yellow-500 hover:bg-yellow-500/10"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Auth */}
            {/* <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#101010] border border-yellow-500/30 rounded-lg text-[#E8D7B5] font-semibold hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                Continue with Facebook
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#101010] border border-yellow-500/30 rounded-lg text-[#E8D7B5] font-semibold hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300">
                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                Continue with Twitter
              </button>
            </div> */}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-yellow-500/20"></div>
              {/* <span className="text-yellow-500/60 text-sm">OR</span> */}
              <div className="flex-1 h-px bg-yellow-500/20"></div>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form
                onSubmit={handleSubmit(onLogin)}
                className="space-y-4 animate-fade-in"
              >
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
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
                      className={`w-full pl-10 pr-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.email ? "border-red-500" : "border-yellow-500/30"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.password
                          ? "border-red-500"
                          : "border-yellow-500/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500/60 hover:text-yellow-500 transition-colors"
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

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-[#101010] border border-yellow-500/30 rounded cursor-pointer"
                    />
                    <span className="text-yellow-500/80 text-sm group-hover:text-yellow-500 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-yellow-500 text-sm font-semibold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full px-8 py-4 bg-yellow-500 text-[#101010] rounded-lg font-bold
                             hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105
                             active:scale-95
                             flex items-center justify-center gap-2 mt-6
                             ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isPending ? "Signing In..." : "Sign In"}
                  {!isPending && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            ) : (
              /* Signup Form */
              <form
                onSubmit={handleSubmit(onSignup)}
                className="space-y-4 animate-fade-in"
              >
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.name ? "border-red-500" : "border-yellow-500/30"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
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
                      className={`w-full pl-10 pr-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.email ? "border-red-500" : "border-yellow-500/30"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password required",
                        minLength: { value: 8, message: "Min 8 characters" },
                      })}
                      placeholder="Create a strong password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.password
                          ? "border-red-500"
                          : "border-yellow-500/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500/60 hover:text-yellow-500 transition-colors"
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

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/60" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Passwords do not match",
                      })}
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-12 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-yellow-500/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500/60 hover:text-yellow-500 transition-colors"
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

                <button
                  type="submit"
                  disabled={isRegisterPending}
                  className={`w-full px-8 py-4 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-6
                  ${isRegisterPending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isRegisterPending ? "Creating Account..." : "Create Account"}
                  {!isRegisterPending && <ArrowRight />}
                </button>

                <p className="text-yellow-500/70 text-xs text-center mt-4">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="text-yellow-500 font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </a>
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
