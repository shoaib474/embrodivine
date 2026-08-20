import React from "react";
import {
  FaTshirt,
  FaShieldAlt,
  FaMagic,
  FaImage,
  FaHatCowboy
} from "react-icons/fa";

const services = [
  {
    title: "Logo Digitizing",
    desc: "Digitize logos with precision for hats, shirts, jackets and more.",
    icon: <FaHatCowboy size={40} />,
  },
  {
    title: "Jacket Back Digitizing",
    desc: "Large back designs digitized with perfect stitch direction and density.",
    icon: <FaTshirt size={40} />,
  },
  {
    title: "Custom Digitizing",
    desc: "Any custom artwork, monogram, or text digitized perfectly.",
    icon: <FaMagic size={40} />,
  },
  {
    title: "Patch Digitizing",
    desc: "Patches, emblems and badges digitized for clean and professional look.",
    icon: <FaShieldAlt size={40} />,
  },
  {
    title: "3D Puff Digitizing",
    desc: "3D puff, raised embroidery digitizing for premium textured effect.",
    icon: <FaImage size={40} />,
  },
];

const DigitizingServices = () => {
  return (
    <section className="bg-[#ffffff] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Top Label */}
        <p className="text-blue-600 font-semibold tracking-widest uppercase">
          Our Service
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Professional Embroidery Digitizing Services
        </h2>

        {/* Sub text */}
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          From simple logos to complex artwork, we digitize every detail with care
          and deliver embroidery-ready files that produce perfect results on any fabric.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Icon */}
              <div className="text-blue-600 mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="font-bold text-xl text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">
                {item.desc}
              </p>

              {/* Divider */}
              <div className="hidden md:block w-px h-20 bg-blue-100 absolute right-0 top-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitizingServices;