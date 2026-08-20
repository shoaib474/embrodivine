import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const VectorComparisonSlider = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Labels */}

      <div className="absolute top-6 left-6 z-20">
        <span className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold">
          RASTER
        </span>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <span className="px-4 py-2 rounded-xl bg-[#007BFF] text-white text-sm font-bold">
          VECTOR
        </span>
      </div>

      <ReactCompareSlider
        position={50}
        itemOne={
          <ReactCompareSliderImage
            src="/images/vector/raster.png"
            alt="Raster"
            style={{
              objectFit: "contain",
            }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="/images/vector/vector.png"
            alt="Vector"
            style={{
              objectFit: "contain",
            }}
          />
        }
        style={{
          width: "100%",
          height: "540px",
        }}
      />
    </div>
  );
};

export default VectorComparisonSlider;
