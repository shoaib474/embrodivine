import { AlertTriangle } from "lucide-react";
import React from "react";

const CartBenefitBar = () => {
  const benefits = [
    {
      icon: AlertTriangle,
      text: "Digital Download Only — no physical item will be shipped.",
    },
  ];

  return (
    <section className="bg-[#ffffff] border-b  border-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-[#666666]">
                <Icon className="w-5 h-5 text-[#007BFF]" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CartBenefitBar;
