import React from "react";
import { Package } from "lucide-react";

const NoProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-24 space-y-4 animate-fadeIn">
      <div className="p-6 rounded-full bg-[#D4AF37]/10">
        <Package className="w-16 h-16 sm:w-20 sm:h-20 text-[#D4AF37] mx-auto" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-[#E8D7B5]">
        No Products Found
      </h3>

      <p className="text-sm sm:text-base text-[#D4AF37]/70 text-center max-w-xs">
        Try adjusting your filters or add a new product to get started.
      </p>

      <button
        className="mt-4 px-6 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-colors text-sm sm:text-base"
        onClick={() => {
          // You can trigger opening the Add Product modal here
          console.log("Open Add Product Modal");
        }}
      >
        Add Product
      </button>
    </div>
  );
};

export default NoProducts;
