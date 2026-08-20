import React from "react";
import { CheckCircle2 } from "lucide-react";

const StepBar = ({ step }) => {
  const steps = ["Artwork", "Details", "Contact", "Review"];
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((label, idx) => {
        const s = idx + 1;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step > s
                    ? "bg-[#007BFF] text-white"
                    : step === s
                      ? "bg-[#007BFF] text-white shadow-lg shadow-[#007BFF]/30 scale-110"
                      : "bg-white text-[#007BFF]/40 border-2 border-[#007BFF]/20"
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span
                className={`text-xs mt-2 font-semibold transition-colors ${
                  step >= s ? "text-[#007BFF]" : "text-[#333333]/30"
                }`}
              >
                {label}
              </span>
            </div>
            {s < 4 && (
              <div
                className={`flex-1 h-1 mx-3 rounded transition-all duration-500 ${
                  step > s ? "bg-[#007BFF]" : "bg-[#007BFF]/15"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepBar;
