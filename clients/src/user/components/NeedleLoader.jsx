const NeedleLoader = () => (
  <div className="min-h-screen bg-[#101010] flex items-center justify-center p-6">
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Needle */}
        <div className="absolute left-1/2 top-0 w-1 h-16 bg-gradient-to-b from-[#E8D7B5] to-[#D4AF37] transform -translate-x-1/2 animate-bounce"></div>
        {/* Thread */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <path
            d="M 50 20 Q 30 40, 50 60 T 50 100"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="animate-dash"
          />
        </svg>
        {/* Eye of needle */}
        <div className="absolute left-1/2 top-14 w-3 h-3 border-2 border-[#D4AF37] rounded-full transform -translate-x-1/2 bg-[#101010]"></div>
      </div>
      <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">Threading...</h2>
      <p className="text-[#D4AF37]/70 text-sm">Setting up your design</p>
    </div>
  </div>
);

export default NeedleLoader;
