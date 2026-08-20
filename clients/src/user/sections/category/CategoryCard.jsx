import { Tag } from "lucide-react";

const CategoryCard = ({ category, onClick, index }) => (
  <div
    onClick={() => onClick(category)}
    className="group bg-[#ffffff] border border-[#007BFF]/20 rounded-2xl overflow-hidden cursor-pointer hover:border-[#007BFF] hover:shadow-[0_0_24px_rgba(0,123,255,0.15)] transition-all duration-300"
    style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.07}s both` }}
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={category.thumbnail.url}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop";
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/80 via-transparent to-transparent" />

      {/* Product count badge */}
      <span className="absolute top-3 right-3 bg-[#007BFF] text-white text-xs font-bold px-2.5 py-1 rounded-full">
        {category.productCount} designs
      </span>
    </div>

    {/* Content */}
    <div className="p-5 bg-[#ffffff]">
      <h3 className="text-[#222222] font-bold text-lg mb-1.5 group-hover:text-[#007BFF] transition-colors duration-200">
        {category.name}
      </h3>
      <p className="text-[#007BFF]/60 text-sm leading-relaxed line-clamp-2 mb-4">
        {category.description}
      </p>

      <button
        className="inline-flex items-center gap-1.5 text-[#007BFF] text-sm font-semibold border border-[#007BFF]/40 rounded-lg px-4 py-1.5 group-hover:bg-[#007BFF] group-hover:text-white transition-all duration-200"
        tabIndex={-1}
      >
        <Tag className="w-3.5 h-3.5" />
        Browse
      </button>
    </div>
  </div>
);

export default CategoryCard;