import { ArrowLeft, Package } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryDetailHeader = ({category, rawProducts}) => {
  const navigate = useNavigate()
  return (
    <section className="border-b border-[#007BFF]/10 pt-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/category")}
          className="inline-flex items-center gap-2 text-[#007BFF] text-sm font-medium hover:text-[#0066CC] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All Categories
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Thumbnail */}
          {category?.thumbnail?.url && (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-[#007BFF]/20 shrink-0 shadow-md">
              <img
                src={category.thumbnail.url}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#007BFF] text-xs font-semibold tracking-widest uppercase mb-1">
              Embrodivine Collection
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#222222]">
              {category?.name}
            </h1>
            <p className="mt-2 text-[#333333]/60 text-sm md:text-base max-w-2xl">
              {category?.description}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-5 mt-4 justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#007BFF]/30 bg-[#007BFF]/5">
                <Package className="w-3.5 h-3.5 text-[#007BFF]" />
                <span className="text-[#007BFF] text-sm font-semibold">
                  {rawProducts.length} Products
                </span>
              </div>
              <div className="h-px w-6 bg-[#007BFF]/20" />
              <span className="text-[#333333]/40 text-xs uppercase tracking-wider">
                Hand-Crafted Designs
              </span>
            </div>
          </div>
        </div>

        {/* Decorative rule */}
        <div className="flex items-center gap-3 mt-8">
          <div className="h-px flex-1 bg-[#007BFF]/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#007BFF]/40" />
          <div className="h-px flex-1 bg-[#007BFF]/10" />
        </div>
      </div>
    </section>
  );
};

export default CategoryDetailHeader;
