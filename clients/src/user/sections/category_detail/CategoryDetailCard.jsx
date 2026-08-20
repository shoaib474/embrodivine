import { Eye, ShoppingCart, Star } from "lucide-react";

const CategoryDetailCard = ({ product, onClick, index }) => (
  <div
    onClick={() => onClick(product._id)}
    className="group bg-white border border-[#007BFF]/20 rounded-2xl overflow-hidden cursor-pointer hover:border-[#007BFF] hover:shadow-[0_0_24px_rgba(0,123,255,0.15)] transition-all duration-300 hover:-translate-y-1"
    style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.06}s both` }}
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={product.image?.url || "/placeholder.png"}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
            product.badge.toLowerCase() === "hot seller"
              ? "bg-[#007BFF] text-white"
              : product.badge.toLowerCase() === "popular"
                ? "bg-[#FF6347] text-white"
                : product.badge.toLowerCase() === "top rated"
                  ? "bg-[#4169E1] text-white"
                  : product.badge.toLowerCase() === "premium"
                    ? "bg-[#800080] text-white"
                    : "bg-gray-500 text-white"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Quick action */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(product._id);
          }}
          className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-[#007BFF]/30 rounded-full flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 bg-[#ffffff]">
      <h3 className="text-[#222222] font-bold text-base mb-1 group-hover:text-[#007BFF] transition-colors duration-200 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-[#333333]/50 text-sm line-clamp-2 mb-3 leading-relaxed">
        {product.description}
      </p>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(product.rating || 0)
                ? "text-[#ff9d00] fill-current"
                : "text-[#ff9d00]/20"
            }`}
          />
        ))}
        <span className="text-[#333333]/40 text-xs ml-1">
          ({product.rating || 0})
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#007BFF]/10">
        <span className="text-[#222222] font-bold text-xl">
          ${product.price}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0066CC] transition-colors duration-200"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  </div>
);

export default CategoryDetailCard