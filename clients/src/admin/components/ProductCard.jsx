import React from "react";
import { Edit, Trash2, Eye, Star } from "lucide-react";
import SpinnerLoader from "../../user/components/SpinnerLoader";

const ProductCard = ({ product, onEdit, onDelete, onView, isLoading, isError }) => {
  if(isLoading) return <SpinnerLoader />;
  if(isError) return <p className="text-red-500">Failed to load product</p>;
  if(!product) return null;
  return (
    <div
      className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group"
      style={{ animation: `fadeInUp 0.6s ease-out both` }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={product.image.url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

        {/* Status Badge */}
        {product.productStatus && (
          <div
            className={`absolute top-3 left-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border bg-green-600 capitalize`}
          >
            {product.productStatus}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(product)}
            className="w-8 h-8 bg-[#101010]/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-lg flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101010] transition-all"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="w-8 h-8 bg-[#101010]/90 backdrop-blur-sm border border-red-500/30 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold capitalize">
              {product.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#E8D7B5] mt-1 truncate">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4AF37] fill-current" />
            <span className="text-xs sm:text-sm text-[#E8D7B5] font-semibold">
              {product.rating}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 text-center">
          <div className="bg-[#101010] rounded-lg p-2">
            <p className="text-[#D4AF37]/70 text-xs mb-1">Price</p>
            <p className="text-[#D4AF37] font-bold text-sm sm:text-base">
              ${product.price}
            </p>
          </div>
          <div className="bg-[#101010] rounded-lg p-2">
            <p className="text-[#D4AF37]/70 text-xs mb-1">Dimensions</p>
            <p className="text-[#E8D7B5] font-bold text-sm sm:text-base">
              {product.dimensions || "ᦠ"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-3 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all text-sm flex items-center justify-center gap-2"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
            Edit
          </button>
          <button
            onClick={() => onView(product)}
            className="px-3 py-2 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all text-sm flex items-center justify-center gap-2"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
