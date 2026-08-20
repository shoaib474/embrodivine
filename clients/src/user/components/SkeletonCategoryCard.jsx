const SkeletonCategoryCard = () => (
  <div className="bg-white border border-[#007BFF]/20 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-[#007BFF]/10" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-[#007BFF]/10 rounded w-2/3" />
      <div className="h-3 bg-[#007BFF]/10 rounded w-full" />
      <div className="h-3 bg-[#007BFF]/10 rounded w-4/5" />
      <div className="h-8 bg-[#007BFF]/10 rounded-lg w-1/3 mt-2" />
    </div>
  </div>
);

export default SkeletonCategoryCard;