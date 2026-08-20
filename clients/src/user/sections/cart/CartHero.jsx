import { Lock } from "lucide-react";
import React from "react";

const CartHero = ({ cartItems }) => {
  return (
    <section className="bg-[#ffffff] border-b border-[#007BFF]/10 pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
          {/* Left Section: Title & Items */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#222222] drop-shadow-md">
              Shopping Cart
            </h1>
            <p className="text-lg sm:text-xl text-[#666666] font-medium">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {/* Right Section: Secure Checkout */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in border border-[#007BFF]/10">
            <Lock className="w-5 h-5 text-[#007BFF]" />
            <span className="font-semibold text-[#007BFF]">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Optional Subtle Sparkle Animation */}
        <div className="relative mt-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-pulse-sparkle absolute w-1 h-1 bg-[#007BFF] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartHero;
