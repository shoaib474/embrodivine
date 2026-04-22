const CartSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl animate-shimmer">
      {/* Image */}
      <div className="w-20 h-20 bg-[#2A2A2A] rounded-lg" />

      {/* Details */}
      <div className="flex-1 space-y-3">
        {/* Title */}
        <div className="h-4 bg-[#2A2A2A] rounded w-2/3" />

        {/* Subtitle */}
        <div className="h-3 bg-[#2A2A2A] rounded w-1/3" />

        {/* Price + qty */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-[#2A2A2A] rounded w-1/4" />

          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-[#2A2A2A] rounded" />
            <div className="w-6 h-4 bg-[#2A2A2A] rounded" />
            <div className="w-8 h-8 bg-[#2A2A2A] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
