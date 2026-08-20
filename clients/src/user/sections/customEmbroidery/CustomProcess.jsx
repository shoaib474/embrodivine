import React from "react";
import { Upload, PenTool, Eye, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "Step 01",
    title: "Upload Your Artwork",
    description:
      "Send us your logo, image, sketch, or any design you'd like converted into a professional embroidery design.",
  },
  {
    icon: PenTool,
    step: "Step 02",
    title: "We Create Your Design",
    description:
      "Our experienced digitizers manually create a clean, production-ready embroidery design with maximum stitch quality.",
  },
  {
    icon: Eye,
    step: "Step 03",
    title: "Review & Approval",
    description:
      "We'll send you a preview for review. If you need any changes, we'll revise it until you're completely satisfied.",
  },
  {
    icon: Download,
    step: "Step 04",
    title: "Receive Final Files",
    description:
      "Download your embroidery-ready files in the required machine format, ready for immediate production.",
  },
];

const CustomProcess = () => {
  return (
    <section className="py-24 bg-[#F8FBFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-[#007BFF] px-5 py-2 rounded-full font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Simple Process,
            <span className="text-[#007BFF]"> Amazing Results</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Getting your custom embroidery design is quick and easy. From upload
            to final delivery, our experts handle every step with precision.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-24">
          {/* Desktop Connecting Line */}

          <div className="hidden lg:block absolute left-0 right-0 top-10 h-1 bg-blue-100"></div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}

                  <div className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-blue-100 shadow-xl items-center justify-center group-hover:border-[#007BFF] transition">
                    <Icon size={34} className="text-[#007BFF]" />
                  </div>

                  {/* Card */}

                  <div className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8 lg:pt-20">
                    {/* Mobile Icon */}

                    <div className="lg:hidden w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                      <Icon size={30} className="text-[#007BFF]" />
                    </div>

                    <span className="text-[#007BFF] font-semibold text-sm">
                      {item.step}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-gray-600 leading-8">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 -right-5 z-20">
                      <ArrowRight size={26} className="text-[#007BFF]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}

        <div className="mt-24 rounded-[35px] bg-gradient-to-r from-[#007BFF] to-[#0066CC] p-10 lg:p-14 shadow-2xl">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white">Ready To Start?</h3>

              <p className="mt-4 text-blue-100 leading-8">
                Upload your artwork today and receive premium-quality embroidery
                designs with fast turnaround.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-6xl font-black text-white">2–6</h2>

              <p className="text-blue-100 mt-2">Average Delivery Hours</p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <a
                href="/upload-artwork"
                className="inline-flex items-center gap-3 bg-white text-[#007BFF] hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold transition"
              >
                Upload Artwork
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomProcess;
