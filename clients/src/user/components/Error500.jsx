import React from "react";
import { AlertCircle, Home, RotateCcw, MessageCircle } from "lucide-react";

const Error500 = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4 sm:px-6 pt-32">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-[#007BFF]/10 rounded-full flex items-center justify-center border-2 border-[#007BFF]/30 animate-pulse">
            <AlertCircle
              className="w-20 h-20 text-[#007BFF]"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-[#007BFF]/20 border-t-[#007BFF] rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-7xl sm:text-8xl font-bold text-[#007BFF]/20 mb-2">
            500
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-3">
            Needle Stuck!
          </h2>
          <p className="text-lg text-[#333333]/80 mb-2">
            Internal Server Error
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-base sm:text-lg text-[#333333]/70 leading-relaxed mb-4">
            Our embroidery machine encountered a technical hiccup. We're working
            to fix the thread tension and get things running smoothly again.
          </p>
          <p className="text-sm text-[#333333]/60">
            Don't worry, your cart and favorites are safe. Please try again in a
            moment.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white border border-[#007BFF]/20 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#333333]/70 text-sm font-semibold">
              Error Code:
            </span>
            <span className="text-[#222222] font-mono bg-[#F5F7FA] px-3 py-1 rounded-lg text-sm">
              EMB-500-SERVER
            </span>
          </div>
          <div className="border-t border-[#007BFF]/10 pt-4">
            <p className="text-[#333333]/60 text-sm leading-relaxed">
              If this error persists, please contact our support team with the
              error code above. We're here to help!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <button
            onClick={handleRefresh}
            className="flex-1 px-6 py-4 bg-[#007BFF] text-white rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="flex-1 px-6 py-4 bg-white border-2 border-[#007BFF] text-[#007BFF] rounded-lg font-bold hover:bg-[#007BFF]/10 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Support Link */}
        <button className="inline-flex items-center gap-2 text-[#333333]/70 hover:text-[#007BFF] transition-colors text-sm">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#007BFF]/30 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-[#007BFF]/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#007BFF]/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Error500;
