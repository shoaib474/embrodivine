import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Star } from "lucide-react";

const portfolio = [
  {
    title: "Lion Embroidery",
    category: "Jacket Back",
    image: "/images/custom/lion.webp",
  },
  {
    title: "BMW Logo",
    category: "Logo",
    image: "/images/custom/bmw.webp",
  },
  {
    title: "Rose Design",
    category: "Custom Artwork",
    image: "/images/custom/rose.webp",
  },
  {
    title: "3D Puff Cap",
    category: "Cap Embroidery",
    image: "/images/custom/cap.webp",
  },
  {
    title: "Eagle Patch",
    category: "Patch",
    image: "/images/custom/eagle.webp",
  },
  {
    title: "Monogram",
    category: "Lettering",
    image: "/images/custom/monogram.webp",
  },
];

const CustomPortfolio = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-5 py-2 rounded-full font-semibold">
            OUR PORTFOLIO
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Our Work Speaks For Itself
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            Every embroidery design is carefully digitized by professionals,
            ensuring outstanding stitch quality and exceptional detail.
          </p>
        </div>

        {/* Gallery */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {portfolio.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[30px] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="inline-block bg-[#007BFF] text-white text-xs px-4 py-2 rounded-full">
                          {item.category}
                        </span>

                        <h3 className="text-white text-2xl font-bold mt-4">
                          {item.title}
                        </h3>
                      </div>

                      <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-[#007BFF] hover:text-white transition">
                        <Eye size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-[#FBBF24]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill="currentColor" />
            ))}
          </div>

          <p className="mt-4 text-gray-600 text-lg">
            Trusted by <strong>12,000+</strong> happy customers worldwide.
          </p>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 mt-10 bg-[#007BFF] hover:bg-[#0066CC] text-white px-8 py-4 rounded-2xl font-semibold transition"
          >
            View More Designs
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomPortfolio;
