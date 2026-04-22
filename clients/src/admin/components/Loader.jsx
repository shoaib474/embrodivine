import { Scissors } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <Scissors className="absolute inset-0 m-auto w-10 h-10 text-[#D4AF37] animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">Loading...</h2>
      </div>
    </div>
  );
};

export default Loader;
