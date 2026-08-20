const CartSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 bg-[#F5F7FA] border border-[#DDE5EE] rounded-xl animate-shimmer">
      {/* Image */}
      <div className="w-20 h-20 bg-[#E9EEF5] rounded-lg" />

      {/* Details */}
      <div className="flex-1 space-y-3">
        {/* Title */}
        <div className="h-4 bg-[#E9EEF5] rounded w-2/3" />

        {/* Subtitle */}
        <div className="h-3 bg-[#E9EEF5] rounded w-1/3" />

        {/* Price + qty */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-[#E9EEF5] rounded w-1/4" />

          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-[#E9EEF5] rounded" />
            <div className="w-6 h-4 bg-[#E9EEF5] rounded" />
            <div className="w-8 h-8 bg-[#E9EEF5] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;