import { ShoppingCart, Star } from "lucide-react";

const CategoryDetailRow = ({ product, onClick, index }) => (
  <div
    onClick={() => onClick(product._id)}
    className="group bg-white border border-[#007BFF]/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#007BFF] hover:shadow-[0_0_16px_rgba(0,123,255,0.12)] transition-all duration-300 flex"
    style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both` }}
  >
    {/* Image */}
    <div className="w-32 h-28 shrink-0 overflow-hidden">
      <img
        src={product.image?.url || "/placeholder.png"}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop";
        }}
      />
    </div>

    {/* Content */}
    <div className="flex-1 px-5 py-4 bg-[#F5F7FA] flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-[#222222] font-bold text-base group-hover:text-[#007BFF] transition-colors duration-200 truncate">
          {product.name}
        </h3>
        <p className="text-[#333333]/50 text-sm mt-0.5 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
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
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="text-[#222222] font-bold text-lg">
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

export default CategoryDetailRow;
