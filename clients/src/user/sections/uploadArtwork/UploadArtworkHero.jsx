import React from "react";
import { Cloud } from "lucide-react";

const UploadArtworkHero = () => {
  return (
    <div className="bg-[#ffffff] border-b border-[#007BFF]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full mb-4">
          <Cloud className="w-4 h-4 text-[#007BFF]" />
          <span className="text-[#007BFF] text-sm font-semibold">
            Artwork Upload Portal
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-3">
          Upload Your Artwork
        </h1>
        <p className="text-[#333333]/50 text-base sm:text-lg max-w-xl mx-auto">
          Send us your design files and we'll digitize them into professional
          embroidery-ready formats.
        </p>

        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16 bg-[#007BFF]/20" />
          <div className="w-2 h-2 rounded-full bg-[#007BFF]/40" />
          <div className="h-px w-16 bg-[#007BFF]/20" />
        </div>
      </div>
    </div>
  );
};

export default UploadArtworkHero;
