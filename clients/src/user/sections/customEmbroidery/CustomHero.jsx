import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, ArrowRight, Upload } from "lucide-react";

const features = [
  "100% Custom Artwork",
  "Premium Stitch Quality",
  "Fast Turnaround",
  "Unlimited Revisions",
];

const images = [
  "/images/custom/lion.webp",
  "/images/custom/cap.webp",
  "/images/custom/rose.webp",
  "/images/custom/eagle.webp",
];

const CustomHero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute -left-24 top-16 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-5 py-2 rounded-full font-semibold">
              <Sparkles size={18} />
              Premium Embroidery Designs
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              Custom
              <span className="block text-[#007BFF]">Embroidery</span>
              Designs
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
              Transform your logo, artwork or concept into premium
              embroidery-ready designs created by professional digitizers with
              exceptional stitch quality.
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#007BFF]" />

                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-12">
              <Link
                to="/upload-artwork"
                className="bg-[#007BFF] hover:bg-[#0066CC] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition"
              >
                <Upload size={20} />
                Upload Artwork
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/pricing"
                className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white px-8 py-4 rounded-2xl font-semibold transition"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-[30px] bg-white shadow-2xl border border-slate-100

                  ${index === 1 ? "mt-12" : ""}

                  ${index === 2 ? "-mt-12" : ""}

                  `}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-72 object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Floating Card */}

            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 bg-white rounded-3xl shadow-2xl px-8 py-5 border border-slate-200">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-[#007BFF]">12K+</h3>

                  <p className="text-gray-500 text-sm">Designs</p>
                </div>

                <div className="w-px h-10 bg-slate-200"></div>

                <div className="text-center">
                  <h3 className="text-3xl font-bold text-[#007BFF]">99%</h3>

                  <p className="text-gray-500 text-sm">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomHero;
