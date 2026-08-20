import { Heart, Shield, Truck, Users } from "lucide-react";
import React from "react";

const ServicesAdditional = () => {
  const additionalServices = [
    {
      icon: Truck,
      title: "Digital File Service",
      description:
        "We provide professional embroidery digitizing and vector files for your designs.",
    },
    {
      icon: Shield,
      title: "High-Quality Digitizing",
      description:
        "Clean, precise embroidery-ready digitizing files made for professional use.",
    },
    {
      icon: Users,
      title: "File Support",
      description:
        "Free support for minor edits or adjustments to ensure your file is perfect.",
    },
    {
      icon: Heart,
      title: "Customer Satisfaction",
      description:
        "We focus on delivering accurate digitizing files that meet your expectations.",
    },
  ];

  return (
    <section className="relative bg-[#ffffff] overflow-hidden">
      {/* Decorative Dots Left */}
      <div className="absolute top-16 left-0 opacity-20">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      {/* Decorative Dots Right */}
      <div className="absolute top-32 right-0 opacity-20">
        <div className="grid grid-cols-5 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#222222]">
            Additional <span className="text-[#007BFF]">Services</span>
          </h2>

          <div className="w-24 h-1 bg-[#007BFF] rounded-full mx-auto mt-6 mb-6"></div>

          <p className="text-lg text-[#555] max-w-2xl mx-auto">
            Everything you need for a seamless experience
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalServices.map((service, idx) => {
            const Icon = service.icon;

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#e9eef5]"
              >
                {/* Card Content */}
                <div className="p-8 text-center relative z-10">
                  {/* Icon */}
                  <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-[#eef5ff] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <Icon
                      className="w-12 h-12 text-[#007BFF]"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#0f172a] leading-tight mb-5">
                    {service.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-[#007BFF] rounded-full mx-auto mb-6"></div>

                  {/* Description */}
                  <p className="text-[#64748b] leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full">
                  <svg
                    viewBox="0 0 500 100"
                    preserveAspectRatio="none"
                    className="w-full h-24"
                  >
                    <path
                      d="M0,40 C120,90 220,0 500,60 L500,100 L0,100 Z"
                      fill="#eef5ff"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesAdditional;
