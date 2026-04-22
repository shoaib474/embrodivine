const OrderSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-32 bg-[#2A2A2A] rounded"></div>
        <div className="h-6 w-20 bg-[#2A2A2A] rounded-full"></div>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#2A2A2A]"></div>
        <div className="space-y-2">
          <div className="h-4 w-40 bg-[#2A2A2A] rounded"></div>
          <div className="h-3 w-24 bg-[#2A2A2A] rounded"></div>
        </div>
      </div>

      {/* Items */}
      <div className="flex gap-3">
        <div className="w-16 h-16 bg-[#2A2A2A] rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-[#2A2A2A] rounded"></div>
          <div className="h-3 w-1/2 bg-[#2A2A2A] rounded"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-[#2A2A2A] rounded"></div>
        <div className="h-8 w-24 bg-[#2A2A2A] rounded"></div>
      </div>
    </div>
  );
};

export default OrderSkeleton;