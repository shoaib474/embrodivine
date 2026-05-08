import { Scissors } from "lucide-react";

const SpinnerLoader = () => {
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <Scissors className="absolute inset-0 m-auto w-10 h-10 text-yellow-500 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">Loading...</h2>
        <p className="text-yellow-500/70 text-sm">Preparing your embroidery</p>
      </div>
    </div>
  );
};

export default SpinnerLoader;
