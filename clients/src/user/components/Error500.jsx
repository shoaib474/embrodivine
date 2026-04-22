import React from 'react';
import { AlertCircle, Home, RotateCcw, MessageCircle } from 'lucide-react';

const Error500 = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4 sm:px-6 pt-32">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center border-2 border-[#D4AF37]/30 animate-pulse">
            <AlertCircle className="w-20 h-20 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-7xl sm:text-8xl font-bold text-[#D4AF37]/20 mb-2">500</h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] mb-3">
            Needle Stuck!
          </h2>
          <p className="text-lg text-[#D4AF37]/80 mb-2">
            Internal Server Error
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-base sm:text-lg text-[#D4AF37]/70 leading-relaxed mb-4">
            Our embroidery machine encountered a technical hiccup. We're working to fix the thread tension and get things running smoothly again.
          </p>
          <p className="text-sm text-[#D4AF37]/60">
            Don't worry, your cart and favorites are safe. Please try again in a moment.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#D4AF37]/70 text-sm font-semibold">Error Code:</span>
            <span className="text-[#E8D7B5] font-mono bg-[#101010] px-3 py-1 rounded-lg text-sm">
              EMB-500-SERVER
            </span>
          </div>
          <div className="border-t border-[#D4AF37]/10 pt-4">
            <p className="text-[#D4AF37]/60 text-sm leading-relaxed">
              If this error persists, please contact our support team with the error code above. We're here to help!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <button
            onClick={handleRefresh}
            className="flex-1 px-6 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="flex-1 px-6 py-4 bg-[#1A1A1A] border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Support Link */}
        <button className="inline-flex items-center gap-2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors text-sm">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#D4AF37]/30 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#D4AF37]/30 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#D4AF37]/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Error500;