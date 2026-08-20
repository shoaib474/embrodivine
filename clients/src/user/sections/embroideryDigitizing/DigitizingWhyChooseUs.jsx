import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
  "/images/digitizing/3dpuff_digitizing.webp",
  "/images/digitizing/mountain_digitizing.webp",
  "/images/digitizing/shirt_anime_digitizing.webp",
  "/images/digitizing/cap_digitizing.webp",
  "/images/digitizing/white_3dpuff_digitizing.webp",
];

const DigitizingWhyChooseUs = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div>
            <div className="overflow-hidden bg-white shadow-2xl">
              <img
                src={images[selected]}
                alt=""
                className="w-full h-[520px] object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4 mt-5">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`overflow-hidden  border-2 transition-all duration-300 ${
                    selected === index
                      ? "border-[#007BFF] shadow-lg scale-105"
                      : "border-transparent hover:border-[#007BFF]/40"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-5xl font-extrabold text-[#222222] leading-tight">
              Why Choose <span className="text-[#007BFF]">EmbroDivine?</span>
            </h2>

            <h4 className="mt-6 uppercase tracking-[4px] text-[#007BFF] font-bold">
              Try The Difference
            </h4>

            <p className="mt-6 text-gray-600 leading-9 text-lg">
              Every embroidery machine behaves differently. That's why every
              design is carefully tested and optimized before delivery. If your
              design doesn't stitch perfectly, we'll revise it until you're
              satisfied. Your success is our priority.
            </p>

            <Link
              to="/quote"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-[#0066CC]"
            >
              GET A FREE QUOTE
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitizingWhyChooseUs;
