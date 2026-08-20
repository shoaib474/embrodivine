const sections = [
  {
    title: "What is Vector Art?",
    description:
      "Vector art is artwork created using mathematical paths instead of pixels. Unlike JPG or PNG images, vector files can be resized infinitely without losing quality, making them perfect for printing, embroidery, signage, screen printing, and branding.",
    image: "/images/digitizing/flower_digitizing.webp",
    alt: "JPG",
  },
  {
    title: "What is Vector Art Used For?",
    description:
      "Vector graphics are widely used for custom apparel, embroidery, screen printing, laser engraving, vehicle wraps, business branding, promotional products, stickers, banners, and professional printing. One vector file can be used across almost every production method.",
    image: "/images/digitizing/flower_digitizing.webp",
    alt: "Logo",
    reverse: true,
  },
];

const VectorInfo = () => {
  return (
    <section className="bg-[#f5f7fa] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[4px] text-blue-600 font-semibold">
            Learn More
          </p>

          <h2 className="text-4xl font-bold text-[#222] mt-3">
            Understanding Vector Art
          </h2>
        </div>

        <div className="space-y-28">
          {sections.map((item, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                item.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Images */}

              <div className="flex justify-center">
                <img
                  src={item.image}
                  className="w-72"
                  alt={item.alt}
                />
              </div>

              {/* Text */}

              <div>
                <h3 className="text-3xl font-bold text-[#222] mb-6">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8 text-lg">
                  {item.description}
                </p>

                <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full font-semibold transition">
                  Get A Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VectorInfo;
