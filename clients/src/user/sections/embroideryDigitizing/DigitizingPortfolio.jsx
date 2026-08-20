import React from "react";

const portfolio = [
  {
    id: 1,
    title: "Anime Design",
    image:
      "/images/digitizing/anime_digitizing.webp",
  },
  {
    id: 2,
    title: "Logo Design",
    image:
      "/images/digitizing/logo_digitizing.webp",
  },
  {
    id: 3,
    title: "Flower Design",
    image:
      "/images/digitizing/flower_digitizing.webp",
  },
  {
    id: 4,
    title: "Fruit Design",
    image:
      "/images/digitizing/fruit_digitizing.webp",
  },
  {
    id: 5,
    title: "Eagle Design",
    image:
      "/images/digitizing/eagle_digitizing.webp",
  },
];

const DigitizingPortfolio = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-2 text-[#007BFF] text-sm font-semibold tracking-wide uppercase">
            Portfolio
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-5">
            Our Work Speaks For Itself
          </h2>

          <p className="text-gray-500 mt-5 max-w-3xl mx-auto leading-8">
            Every embroidery file is manually digitized with precision, ensuring
            smooth stitching, perfect density, and professional quality across
            every design.
          </p>
        </div>

        {/* Portfolio */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
              </div>

              {/* Bottom */}
              <div className="p-5 text-center">
                <h3 className="font-semibold text-slate-800 text-lg">
                  {item.title}
                </h3>

                <div className="mt-3 w-14 h-1 bg-[#007BFF] rounded-full mx-auto transition-all duration-300 group-hover:w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitizingPortfolio;
