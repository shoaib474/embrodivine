import React from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  ShieldCheck,
  Rocket,
  Infinity,
  Headphones,
  ArrowRight,
  Eye,
  CheckCircle2,
  Files,
} from "lucide-react";
import VectorComparisonSlider from "./VectorComparisonSlider";

const features = [
  {
    icon: BadgeCheck,
    title: "100% Manual Tracing",
  },
  {
    icon: ShieldCheck,
    title: "High Quality Output",
  },

  {
    icon: Files,
    title: "All File Formats Supported",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
  },
];

const VectorConversionHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff]">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-32 top-16 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

        <div className="absolute right-0 top-0 w-[450px] h-[450px] rounded-full bg-blue-50 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            <h1 className="mt-8 text-5xl lg:text-6xl font-black leading-tight text-slate-900">
              Professional
              <span className="block text-[#007BFF]">
                Vector Art Conversion
              </span>
              Services
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
              We manually convert logos, artwork and raster images into clean,
              scalable vector files with perfect accuracy for printing,
              embroidery, signage and branding.
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <item.icon size={22} className="text-[#007BFF]" />
                  {/* <span className="text-[#007BFF]">{item.icon && }</span> */}

                  <span className="text-slate-700 font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <VectorComparisonSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VectorConversionHero;
