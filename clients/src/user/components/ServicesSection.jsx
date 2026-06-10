import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      title: "Digitizing",
      description:
        "We specialize in creating precision embroidery designs that combine quality, efficiency, and durability. Each design is thoughtfully digitized to run seamlessly on embroidery machines, minimize production time, and achieve crisp, detailed stitching that brings your artwork to life..",
      image: "/images/services1.webp",
      link: "/embroidery-digitizing",
    },
    {
      title: "Vector Conversion",
      description:
        "Turn your raster images into precise, high-resolution vector artwork designed for maximum versatility. Our expertly crafted vector files can be resized without losing quality, making them ideal for apparel printing, promotional products, laser cutting, digital media, large-format printing, and more.",
      image: "/images/services2.webp",
      // link: "/services/vector",
    },
    {
      title: "Custom Embroidery Designs",
      description:
        "Unique and premium embroidery designs created specifically for your business, brand, or personal projects. Our custom digitizing services ensure your artwork is transformed into machine-ready files that produce stunning, high-quality embroidery results on any fabric or garment.",
      image: "/images/servi3.png",
      // link: "/services/custom",
    },
  ];

  return (
    <section className="bg-[#0b0b0f] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-white uppercase tracking-[4px] text-sm font-semibold text-3xl md:text-4xl ">
            Services We Provide
          </span>

          <h2 className="font-bold text-yellow-500 mt-4">What We Offer</h2>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center text-center md:text-left ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-3xl object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-lg leading-8 mb-8">
                  {service.description}
                </p>

                <Link
                  to={service.link}
                  className="
                    inline-flex
                    items-center
                    px-8
                    py-3
                    bg-yellow-500
                    text-black
                    font-semibold
                    rounded-full
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
