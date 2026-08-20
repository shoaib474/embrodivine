import React from "react";
import { Upload, PencilRuler, Eye, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Upload,
    step: "STEP 01",
    title: "Upload Artwork",
    description:
      "Upload your logo, sketch, PNG, JPG, PDF or any artwork. We accept almost every file format.",
  },
  {
    icon: PencilRuler,
    step: "STEP 02",
    title: "Manual Vector Tracing",
    description:
      "Our designers redraw every detail manually inside Adobe Illustrator for maximum precision.",
  },
  {
    icon: Eye,
    step: "STEP 03",
    title: "Review & Approval",
    description:
      "We'll send you a preview before delivery. Unlimited revisions are included until you're satisfied.",
  },
  {
    icon: Download,
    step: "STEP 04",
    title: "Download Files",
    description:
      "Receive AI, EPS, SVG, PDF, CDR and other editable vector files ready for printing.",
  },
];

const VectorProcess = () => {
  return (
    <section className="py-24 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-5 py-2 text-[#007BFF] font-semibold">
            OUR PROCESS
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            How We Create
            <span className="text-[#007BFF]"> Perfect Vector Files</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every design is manually recreated by professional vector artists to
            ensure exceptional quality and scalability.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-24">
          {/* Line */}

          <div className="hidden lg:block absolute left-0 right-0 top-10 h-1 bg-blue-100"></div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="relative group">
                  {/* Desktop Circle */}

                  <div className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-blue-100 items-center justify-center">
                    <Icon size={34} className="text-[#007BFF]" />
                  </div>

                  {/* Card */}

                  <div className="bg-[#F8FBFF] border border-slate-200 p-8 lg:pt-20">
                    {/* Mobile Icon */}

                    <div className="lg:hidden w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                      <Icon size={30} className="text-[#007BFF]" />
                    </div>

                    <span className="text-[#007BFF] font-bold text-sm tracking-wide">
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

                  {index !== steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 -right-5 z-20">
                      <ArrowRight size={28} className="text-[#007BFF]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VectorProcess;
