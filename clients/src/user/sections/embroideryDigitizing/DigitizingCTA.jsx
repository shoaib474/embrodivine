import React from "react";
import { ShieldCheck, Upload, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DigitizingCTA = () => {
  return (
    <section className="bg-[#ffffff] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#007BFF] via-[#0066CC] to-[#0054B5] shadow-2xl">
          {/* Decorative Blur */}
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

          {/* Dotted Border */}
          <div className="absolute inset-3 rounded-[24px] border border-dashed border-white/20"></div>

          <div className="relative grid items-center gap-10 px-10 py-12 md:px-14 lg:grid-cols-2">
            {/* Left */}
            <div className="flex items-center gap-7">
              <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:rotate-6 hover:scale-105 md:flex">
                <ShieldCheck size={50} className="text-[#007BFF]" />
              </div>

              <div>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                  Ready to Digitize Your Design?
                </h2>

                <p className="mt-4 max-w-xl leading-8 text-blue-100">
                  Get premium embroidery digitizing at affordable prices. Upload
                  your artwork today and receive a fast quote from our
                  experienced digitizers within minutes.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-start lg:justify-end">
              <Link
                to="/upload-artwork"
                className="group inline-flex items-center gap-4 rounded-2xl bg-white px-8 py-5 font-semibold text-[#007BFF] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-50 active:scale-95"
              >
                <Upload size={22} />
                Upload Artwork
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitizingCTA;
