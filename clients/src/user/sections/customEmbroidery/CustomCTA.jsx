import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  CheckCircle2,
  Star,
  BadgeCheck,
  Clock3,
} from "lucide-react";

const features = [
  "100% Hand Digitized",
  "Unlimited Revisions",
  "2–6 Hour Turnaround",
  "Production Ready Files",
];

const stats = [
  {
    number: "12K+",
    label: "Projects Completed",
  },
  {
    number: "99%",
    label: "Customer Satisfaction",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
];

const CustomCTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#007BFF] via-[#0A84FF] to-[#0066CC] shadow-2xl">
          {/* Background Effects */}

          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-14 items-center px-10 lg:px-16 py-16">
            {/* LEFT */}

            <div>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white font-semibold">
                <BadgeCheck size={18} />
                Premium Embroidery Service
              </span>

              <h2 className="mt-8 text-5xl font-black leading-tight text-white">
                Bring Your
                <span className="block">Ideas To Life</span>
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8 max-w-xl">
                Upload your artwork today and let our experienced digitizers
                transform it into professional embroidery files with clean
                stitches and exceptional quality.
              </p>

              {/* Features */}

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-white"
                  >
                    <CheckCircle2 size={20} className="text-green-300" />

                    {item}
                  </div>
                ))}
              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-5 mt-12">
                <Link
                  to="/upload-artwork"
                  className="bg-white text-[#007BFF] hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition"
                >
                  <Upload size={20} />
                  Upload Artwork
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  className="border border-white text-white hover:bg-white hover:text-[#007BFF] px-8 py-4 rounded-2xl font-semibold transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative">
              {/* Main Card */}

              <div className="bg-white rounded-[30px] shadow-2xl p-10">
                <img
                  src="/images/custom/featured-design.webp"
                  alt="Custom Embroidery Design"
                  className="w-full h-72 object-cover rounded-2xl"
                />

                <h3 className="mt-8 text-3xl font-bold text-slate-900">
                  Premium Stitch Quality
                </h3>

                <p className="mt-4 text-gray-600 leading-8">
                  Every design is manually digitized to ensure clean stitching,
                  smooth paths and perfect embroidery results on every machine.
                </p>

                {/* Rating */}

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          fill="#FBBF24"
                          color="#FBBF24"
                        />
                      ))}
                    </div>

                    <p className="mt-2 text-gray-500">
                      Rated 4.9/5 by our clients
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[#007BFF]">
                    <Clock3 size={20} />

                    <span className="font-semibold">2–6 Hrs</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}

              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%]">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 px-8 py-6">
                  <div className="grid grid-cols-3 gap-6">
                    {stats.map((item) => (
                      <div key={item.label} className="text-center">
                        <h3 className="text-3xl font-bold text-[#007BFF]">
                          {item.number}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCTA;
