import React from "react";
import {
  Shirt,
  Badge,
  Scissors,
  Sparkles,
  Crown,
  Palette,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Badge,
    title: "Logo Embroidery",
    description:
      "Professional logo embroidery with clean stitches for uniforms, caps, jackets and corporate apparel.",
  },
  {
    icon: Shirt,
    title: "Cap & Hat Designs",
    description:
      "Premium embroidery for baseball caps, snapbacks, trucker hats and promotional headwear.",
  },
  {
    icon: Sparkles,
    title: "3D Puff Embroidery",
    description:
      "Raised foam embroidery creating bold and premium looking embroidered logos.",
  },
  {
    icon: Scissors,
    title: "Applique Designs",
    description:
      "Beautiful applique embroidery for schools, fashion brands and sportswear.",
  },
  {
    icon: Crown,
    title: "Patch Designs",
    description:
      "Custom embroidered patches with merrow borders, heat seal or Velcro backing.",
  },
  {
    icon: Palette,
    title: "Custom Artwork",
    description:
      "Completely custom embroidery artwork created from your idea, sketch or reference image.",
  },
];

const CustomServices = () => {
  return (
    <section className="py-24 bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-5 py-2 rounded-full font-semibold">
            OUR SERVICES
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Custom Embroidery Services
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            We create premium embroidery designs for businesses, clothing
            brands, sports teams and personal projects with exceptional stitch
            quality.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8"
              >
                <div className="w-18 h-18">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-[#007BFF] transition">
                    <Icon
                      size={32}
                      className="text-[#007BFF] group-hover:text-white transition"
                    />
                  </div>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-5 text-gray-600 leading-8">
                  {service.description}
                </p>

                <Link
                  to="/upload-artwork"
                  className="inline-flex items-center gap-2 mt-8 text-[#007BFF] font-semibold hover:gap-3 transition-all"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-[35px] bg-gradient-to-r from-[#007BFF] via-[#0A84FF] to-[#0066CC] p-10 lg:p-14 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-4xl font-bold text-white">
                Need a Custom Embroidery Design?
              </h3>

              <p className="mt-4 text-blue-100 text-lg max-w-2xl">
                Upload your artwork and our professional digitizers will
                transform it into a production-ready embroidery file with
                outstanding quality.
              </p>
            </div>

            <Link
              to="/upload-artwork"
              className="bg-white text-[#007BFF] hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition whitespace-nowrap"
            >
              Upload Artwork
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomServices;
