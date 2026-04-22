const CartSummarySkeleton = () => {
  return (
    <div className="p-3 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl flex justify-between animate-shimmer">
      
      {/* Image */}
      <div className="w-16 h-16 bg-[#2A2A2A] rounded-lg" />

      {/* Text */}
      <div className="flex-1 ml-4 space-y-3">
        <div className="h-4 bg-[#2A2A2A] rounded w-1/2" />
        <div className="h-3 bg-[#2A2A2A] rounded w-full" />
        <div className="h-3 bg-[#2A2A2A] rounded w-3/4" />
      </div>
    </div>
  );
};

export default CartSummarySkeleton;