const CartSummarySkeleton = () => {
  return (
    <div className="p-3 bg-white border border-[#007BFF]/20 rounded-xl flex justify-between animate-shimmer shadow-sm">
      {/* Image */}
      <div className="w-16 h-16 bg-[#F5F7FA] rounded-lg" />

      {/* Text */}
      <div className="flex-1 ml-4 space-y-3">
        <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
        <div className="h-3 bg-[#E5E7EB] rounded w-full" />
        <div className="h-3 bg-[#E5E7EB] rounded w-3/4" />
      </div>
    </div>
  );
};

export default CartSummarySkeleton;
