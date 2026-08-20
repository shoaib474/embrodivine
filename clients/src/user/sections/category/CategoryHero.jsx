import React from "react";

const CategoryHero = ({categories}) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-[#ffffff] to-white border-b border-blue-100">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#007BFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#007BFF]/10 rounded-full blur-3xl" />

      <div
        className="relative max-w-5xl mx-auto px-4 text-center"
        style={{ animation: "fadeInUp 0.6s ease-out both" }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#007BFF]/20 bg-white shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-[#007BFF]" />
          <span className="text-sm font-semibold tracking-wide text-[#007BFF] uppercase">
            Embrodivine Collections
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#222222] leading-tight">
          Browse by
          <span className="block mt-2 bg-gradient-to-r from-[#007BFF] to-[#00A3FF] bg-clip-text text-transparent">
            Category
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover premium embroidery designs crafted with precision. Explore
          categories and find the perfect design for your next creative project.
        </p>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#007BFF]" />
          <div className="w-4 h-4 rounded-full border-4 border-[#007BFF] bg-white shadow-md" />
          <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#007BFF]" />
        </div>

        {/* ── Stats strip ── */}
        <div
          className="flex justify-center gap-8  mt-12"
          style={{ animation: "fadeInUp 0.5s ease-out 0.1s both" }}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-[#007BFF]">
              {categories.length}
            </p>
            <p className="text-[#333333]/50 text-xs uppercase tracking-wider mt-0.5">
              Categories
            </p>
          </div>
          <div className="w-px bg-[#007BFF]/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[#007BFF]">
              {categories.reduce((s, c) => s + c.productCount, 0)}+
            </p>
            <p className="text-[#333333]/50 text-xs uppercase tracking-wider mt-0.5">
              Designs
            </p>
          </div>
          <div className="w-px bg-[#007BFF]/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[#007BFF]">100%</p>
            <p className="text-[#333333]/50 text-xs uppercase tracking-wider mt-0.5">
              Custom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
