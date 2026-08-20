import React from "react";
import {
  CheckCircle2,
  FileImage,
  FileText,
  Layers3,
  Printer,
  PenTool,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  "Manual Vector Tracing",
  "Logo Redrawing",
  "Image to Vector",
  "Low Resolution Cleanup",
  "Print Ready Artwork",
  "Color Separation",
  "Business Logo Recreation",
  "Large Format Graphics",
];

const formats = ["AI", "EPS", "SVG", "PDF", "CDR", "DXF", "PNG", "JPG"];

const software = [
  {
    icon: PenTool,
    title: "Adobe Illustrator",
  },
  {
    icon: Layers3,
    title: "CorelDRAW",
  },
  {
    icon: Printer,
    title: "Print Ready",
  },
  {
    icon: FileImage,
    title: "Editable Artwork",
  },
];

const VectorFormats = () => {
  return (
    <section className="py-24 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[#007BFF] px-5 py-2 font-semibold">
            FILE FORMATS
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Everything You Need For
            <span className="text-[#007BFF]"> Professional Printing</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            We deliver industry-standard vector files that work perfectly with
            printing companies, sign shops, embroidery businesses and branding
            agencies.
          </p>
        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          {/* Left */}

          <div className="bg-[#f5f7fa] p-10 border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900">
              Our Vector Services
            </h3>

            <p className="mt-4 text-gray-600">
              Every order includes professional manual vector tracing with clean
              paths and editable artwork.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {services.map((service) => (
                <div key={service} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#007BFF] mt-1" />

                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}

          <div className="bg-gradient-to-br from-[#007BFF] via-[#0A84FF] to-[#0066CC] p-10 border border-slate-200 text-white">
            <div className="flex items-center gap-3">
              <FileText size={30} />

              <h3 className="text-3xl font-bold">Supported Formats</h3>
            </div>

            <p className="mt-5 text-blue-100 leading-8">
              Receive editable source files along with print-ready exports
              suitable for every production workflow.
            </p>

            <div className="grid grid-cols-4 gap-4 mt-10">
              {formats.map((format) => (
                <div
                  key={format}
                  className="bg-white/10 rounded-lg py-5 text-center font-bold text-xl border border-white/10"
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Software Cards */}

        {/* <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
          {software.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-[28px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-8 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Icon size={30} className="text-[#007BFF]" />
                </div>

                <h4 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default VectorFormats;
