const CategoryRow = ({ category, onClick, index }) => (
  <div
    onClick={() => onClick(category)}
    className="group bg-[#ffffff] border border-[#007BFF]/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#007BFF] hover:shadow-[0_0_16px_rgba(0,123,255,0.12)] transition-all duration-300 flex items-center gap-0"
    style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both` }}
  >
    <div className="w-28 h-24 shrink-0 overflow-hidden">
      <img
        src={category.thumbnail.url}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop";
        }}
      />
    </div>

    <div className="flex-1 px-5 py-4 bg-[#ffffff]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[#222222] font-bold text-base group-hover:text-[#007BFF] transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-[#007BFF]/60 text-sm mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>
        <span className="shrink-0 bg-[#007BFF]/10 text-[#007BFF] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#007BFF]/30">
          {category.productCount} designs
        </span>
      </div>
    </div>

    <div className="pr-5 bg-[#ffffff] self-stretch flex items-center">
      <span className="text-[#007BFF]/40 group-hover:text-[#007BFF] text-xl transition-colors duration-200">
        →
      </span>
    </div>
  </div>
);

export default CategoryRow;
