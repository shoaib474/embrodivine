import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const comparisons = [
  {
    title: "Tiger Logo",
    category: "Sports Logo",
    before: "/images/vector/tiger-before.webp",
    after: "/images/vector/tiger-after.webp",
  },
  {
    title: "Vintage Badge",
    category: "Business Logo",
    before: "/images/vector/badge-before.webp",
    after: "/images/vector/badge-after.webp",
  },
  {
    title: "Car Illustration",
    category: "Automotive",
    before: "/images/vector/car-before.webp",
    after: "/images/vector/car-after.webp",
  },
  {
    title: "Rose Artwork",
    category: "Tattoo Design",
    before: "/images/vector/rose-before.webp",
    after: "/images/vector/rose-after.webp",
  },
  {
    title: "Eagle Logo",
    category: "Mascot Logo",
    before: "/images/vector/eagle-before.webp",
    after: "/images/vector/eagle-after.webp",
  },
  {
    title: "Typography",
    category: "Text Logo",
    before: "/images/vector/text-before.webp",
    after: "/images/vector/text-after.webp",
  },
];

const BeforeAfterGallery = () => {
  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex px-5 py-2 text-[#007BFF] font-semibold">
            BEFORE & AFTER
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            See The
            <span className="text-[#007BFF]"> Transformation</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Drag the slider to compare low-quality raster artwork with our
            professionally recreated vector files.
          </p>
        </div>

        {/* Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {comparisons.map((item) => (
            <div
              key={item.title}
              className="bg-[#ffffff] overflow-hidden border border-slate-200"
            >
              {/* Slider */}

              <div className="relative">
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-[#007BFF] px-4 py-2 rounded-lg text-xs font-bold">
                    BEFORE
                  </span>
                </div>

                <div className="absolute top-5 right-5 z-20">
                  <span className="text-[#007BFF] px-4 py-2 rounded-lg text-xs font-bold">
                    AFTER
                  </span>
                </div>

                <ReactCompareSlider
                  position={50}
                  style={{
                    width: "100%",
                    height: "320px",
                  }}
                  itemOne={
                    <ReactCompareSliderImage src={item.before} alt="Before" />
                  }
                  itemTwo={
                    <ReactCompareSliderImage src={item.after} alt="After" />
                  }
                />
              </div>

              {/* Content */}

              <div className="p-7">
                <span className="inline-block text-[#007BFF] px-4 py-2 text-sm font-semibold">
                  {item.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  Professionally hand-traced for crisp, scalable, print-ready
                  vector quality.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-20 text-center">
          <Link
            to="/upload-artwork"
            className="inline-flex items-center gap-3 bg-[#007BFF] hover:bg-[#0066CC] text-white px-8 py-4 rounded-2xl font-bold transition"
          >
            Convert My Artwork
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
