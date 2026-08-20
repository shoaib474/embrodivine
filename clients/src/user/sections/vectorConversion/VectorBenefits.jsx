import React from "react";
import {
  Maximize,
  Printer,
  FilePenLine,
  Target,
  Layers3,
  Clock3,
} from "lucide-react";

const benefits = [
  {
    icon: Maximize,
    title: "Scalable to Any Size",
    description:
      "Resize your artwork from business cards to billboards without losing quality.",
  },
  {
    icon: Printer,
    title: "Perfect for Printing",
    description:
      "Ideal for screen printing, DTF, sublimation, embroidery and signage.",
  },
  {
    icon: FilePenLine,
    title: "Editable Source Files",
    description:
      "Receive fully editable AI, EPS, SVG and PDF vector source files.",
  },
  {
    icon: Target,
    title: "Crisp & Clean Output",
    description:
      "Every line and curve is manually traced for maximum precision.",
  },
  {
    icon: Layers3,
    title: "Works Everywhere",
    description:
      "Compatible with Adobe Illustrator, CorelDRAW, Cricut, Silhouette and more.",
  },
  {
    icon: Clock3,
    title: "Save Time & Money",
    description:
      "Professional vector files reduce printing issues and costly redesigns.",
  },
];

const VectorBenefits = () => {
  return (
    <section className="py-24 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-black text-slate-900">
            Benefits of
            <span className="text-[#007BFF]"> Vector Conversion</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Vector artwork stays perfectly sharp at every size, making it the
            industry standard for professional printing, branding and
            production.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-20">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group bg-white border border-slate-200 p-7 text-center"
              >
                <div className="mx-auto w-20 h-20 flex items-center justify-center">
                  <Icon size={34} className="text-[#007BFF]" />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7 text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VectorBenefits;
