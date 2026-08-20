import React from "react";
import { DollarSign, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const QuoteCTA = () => {
  return (
    <section className="bg-[#ffffff] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
     

      <div className="relative max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#222222]">
          Bring Your Custom Embroidery Ideas to Life
        </h2>

        <p className="text-[#333333] text-lg sm:text-xl max-w-2xl mx-auto">
          Get a free quote today and let our expert team turn your vision into a
          beautifully embroidered reality.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#007BFF] text-white font-bold rounded-lg shadow-lg hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Request a Free Quote
          </Link>

          <Link
            to="/store"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#007BFF] text-[#007BFF] font-bold rounded-lg hover:bg-[#007BFF]/10 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuoteCTA;
