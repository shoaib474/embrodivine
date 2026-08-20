const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-shimmer">
      {/* Image */}
      <div className="aspect-square bg-[#F5F7FA]" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-[#F5F7FA] rounded w-3/4" />

        {/* Category */}
        <div className="h-3 bg-[#F5F7FA] rounded w-1/2" />

        {/* Price */}
        <div className="h-5 bg-[#F5F7FA] rounded w-1/3 mt-2" />

        {/* Rating */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#F5F7FA] rounded" />
          ))}
        </div>

        {/* Button */}
        <div className="h-10 bg-[#F5F7FA] rounded-lg mt-3" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
