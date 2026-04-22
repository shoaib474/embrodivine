const FavoriteSkeleton = () => {
  return (
    <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden animate-shimmer">
      {/* Image */}
      <div className="aspect-square bg-[#2A2A2A]" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#2A2A2A] rounded w-3/4" />
        <div className="h-4 bg-[#2A2A2A] rounded w-1/2" />

        {/* Stars */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#2A2A2A] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteSkeleton;
