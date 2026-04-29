const ServicesSection = () => {
  const services = [
    {
      title: "Digitizing",
      image: "/images/digitizing.jpeg",
      description:
        "Premium embroidery digitizing for logos, caps, jackets, 3D puff and custom designs with sharp stitch quality and fast turnaround.",
    },
    {
      title: "Vector",
      image: "/images/vector.jpeg",
      description:
        "High-quality vector conversion of logos and images into scalable, print-ready files for branding and professional use.",
    },
    {
      title: "Patches",
      image: "/images/patches2.jpeg",
      description:
        "Custom embroidered patches with detailed stitching, durable finish, and options like iron-on, sew-on, and Velcro backing.",
    },
  ];

  return (
    <section className="bg-[#0b0b0f] text-white py-20 px-6">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide">
          Our Services
        </h2>
        <p className="text-gray-400 mt-3">
          Premium embroidery solutions crafted for your brand identity
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-yellow-500/20 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
