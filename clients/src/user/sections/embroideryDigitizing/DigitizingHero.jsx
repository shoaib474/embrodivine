import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "100% Manual Digitizing",
  "Fast Turnaround",
  "High Quality Stitching",
  "All File Formats Supported",
];

const DigitizingHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff] to-white">
      {/* Background Glow */}

      <div className="absolute -left-40 top-10 w-[450px] h-[450px] rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      <div className="absolute -right-40 bottom-0 w-[450px] h-[450px] rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      {/* Decorative Dots */}

      <div className="absolute top-40 left-6 hidden xl:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      <div className="absolute top-48 right-6 hidden xl:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            {/* Badge */}

            {/* <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#007BFF]/20 bg-[#EEF5FF] text-[#007BFF] font-semibold mb-8">
              <Sparkles size={16} />
              PREMIUM QUALITY
            </div> */}

            {/* Heading */}

            <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#0F172A]">
              Embroidery
              <span className="block text-[#007BFF]">Digitizing</span>
            </h1>

            <div className="w-24 h-1 rounded-full bg-[#007BFF] mt-8 mb-8"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              We convert your logo, artwork, and custom designs into premium
              embroidery files with clean stitches, perfect density, and
              machine-ready precision.
            </p>

            {/* Features */}

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#007BFF]" size={22} />

                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}

            {/* <div className="flex flex-col sm:flex-row gap-5 mt-12">
              <Link
                to="/quote"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#007BFF] hover:bg-[#0066CC] text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Free Quote
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-[#007BFF]/20 text-[#007BFF] font-bold hover:bg-[#EEF5FF] transition-all"
              >
                View Pricing
              </Link>
            </div> */}
          </div>

          {/* RIGHT */}

          <div className="relative">
            {/* Blue Background */}

            <div className="absolute right-0 bottom-0 w-[90%] h-[85%] rounded-[50px] bg-gradient-to-br from-[#007BFF] to-[#0066CC]"></div>

            {/* Main Image */}

            <div className="relative z-10">
              <img
                src="/images/digitizing/embroidery-machine.webp"
                alt="Embroidery Digitizing"
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitizingHero;
