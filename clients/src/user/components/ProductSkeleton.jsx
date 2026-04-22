const ProductSkeleton = () => {
  return (
    <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden animate-shimmer">
      {/* Image */}
      <div className="aspect-square bg-[#2A2A2A]" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-[#2A2A2A] rounded w-3/4" />

        {/* Category */}
        <div className="h-3 bg-[#2A2A2A] rounded w-1/2" />

        {/* Price */}
        <div className="h-5 bg-[#2A2A2A] rounded w-1/3 mt-2" />

        {/* Rating */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#2A2A2A] rounded" />
          ))}
        </div>

        {/* Button */}
        <div className="h-10 bg-[#2A2A2A] rounded-lg mt-3" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
