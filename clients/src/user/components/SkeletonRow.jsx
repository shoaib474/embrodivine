const SkeletonRow = () => (
  <div className="bg-white border border-[#007BFF]/20 rounded-xl overflow-hidden animate-pulse flex">
    <div className="w-32 h-28 bg-[#007BFF]/10 shrink-0" />
    <div className="flex-1 p-5 space-y-3">
      <div className="h-5 bg-[#007BFF]/10 rounded w-1/3" />
      <div className="h-3 bg-[#007BFF]/10 rounded w-full" />
      <div className="h-3 bg-[#007BFF]/10 rounded w-2/3" />
    </div>
  </div>
);

export default SkeletonRow;
