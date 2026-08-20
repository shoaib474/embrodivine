const FavoriteSkeleton = () => {
  return (
    <div className="bg-white border border-[#007BFF]/20 rounded-xl overflow-hidden animate-shimmer">
      {/* Image */}
      <div className="aspect-square bg-[#F5F7FA]" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#E5E7EB] rounded w-3/4" />
        <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />

        {/* Stars */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#E5E7EB] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteSkeleton;
