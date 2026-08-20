import React from "react";
import {
  ShieldCheck,
  Clock3,
  RefreshCcw,
  Headphones,
  BadgeCheck,
  Award,
} from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "100% Manual Digitizing",
    description:
      "Every embroidery file is created manually by experienced digitizers. We never rely on auto-digitizing software.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Most embroidery designs are completed and delivered within 2–6 hours.",
  },
  {
    icon: RefreshCcw,
    title: "Unlimited Revisions",
    description:
      "Need adjustments? We'll revise your design until you're completely satisfied.",
  },
  {
    icon: Award,
    title: "Production Ready Files",
    description:
      "Receive clean, optimized files ready to run on your embroidery machine.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Stitch Quality",
    description:
      "Our files minimize trims, jumps and thread breaks for smoother embroidery.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our embroidery specialists are always available whenever you need assistance.",
  },
];

const stats = [
  {
    number: "12K+",
    label: "Completed Designs",
  },
  {
    number: "99%",
    label: "Client Satisfaction",
  },
  {
    number: "2–6 Hrs",
    label: "Average Delivery",
  },
  {
    number: "24/7",
    label: "Customer Support",
  },
];

const formats = ["DST", "PES", "JEF", "EXP", "VP3", "HUS", "XXX", "PCS"];

const CustomGuarantee = () => {
  return (
    <section className="py-24 bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-5 py-2 rounded-full font-semibold">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Quality You Can Trust
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            We combine professional digitizing expertise with outstanding
            customer service to deliver embroidery files that exceed
            expectations.
          </p>
        </div>

        {/* Guarantee Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {guarantees.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-[#007BFF] transition">
                  <Icon
                    size={30}
                    className="text-[#007BFF] group-hover:text-white transition"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-gray-600 leading-8">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Statistics */}

        <div className="mt-24 rounded-[35px] bg-gradient-to-r from-[#007BFF] via-[#0A84FF] to-[#0066CC] p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <h3 className="text-5xl font-black text-white">
                  {item.number}
                </h3>

                <p className="text-blue-100 mt-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Formats */}

        <div className="mt-20 bg-white rounded-[35px] border border-slate-200 shadow-xl p-10">
          <h3 className="text-3xl font-bold text-center text-slate-900">
            Supported Embroidery File Formats
          </h3>

          <p className="text-center text-gray-500 mt-4">
            We deliver files compatible with all major embroidery machines.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">
            {formats.map((format) => (
              <div
                key={format}
                className="px-8 py-4 rounded-2xl bg-[#F5F8FD] border border-blue-100 text-[#007BFF] font-bold text-lg hover:bg-[#007BFF] hover:text-white transition"
              >
                {format}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Banner */}

        <div className="mt-20 rounded-[35px] bg-white border border-slate-200 shadow-xl p-10 lg:p-14">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                Trusted By Businesses Worldwide
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                From small businesses to global brands, we help customers create
                premium embroidery files with consistent quality, fast
                turnaround and excellent customer support.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-black text-[#007BFF]">★★★★★</div>

              <p className="mt-4 text-lg font-semibold text-slate-900">
                Rated 4.9 / 5
              </p>

              <p className="text-gray-500">
                Based on thousands of completed orders.
              </p>
            </div>

            <div className="flex justify-center">
              <button className="bg-[#007BFF] hover:bg-[#0066CC] text-white px-10 py-5 rounded-2xl font-bold text-lg transition">
                Start Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomGuarantee;
