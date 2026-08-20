import React from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  "100% Manual Vector Tracing",
  "Unlimited Revisions",
  "2–6 Hour Turnaround",
  "Print Ready Files",
];

const VectorCTA = () => {
  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0066CC] rounded-3xl shadow-xl p-10 lg:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Convert Your Artwork?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-blue-100 leading-7">
            We manually convert your logo, sketch, or image into clean, scalable
            vector artwork that's perfect for printing, branding, laser cutting,
            and more.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-center gap-2 text-white"
              >
                <CheckCircle2
                  size={18}
                  className="text-green-300 flex-shrink-0"
                />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/upload-artwork"
              className="inline-flex items-center gap-2 bg-white text-[#007BFF] hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition"
            >
              <Upload size={18} />
              Upload Artwork
            </Link>

            <Link
              to="/store"
              className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#007BFF] font-semibold px-6 py-3 rounded-xl transition"
            >
              View Design
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VectorCTA;
