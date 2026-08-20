import {
  Target,
  Clock3,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Precision Digitizing",
    description:
      "Pixel-perfect embroidery digitizing with clean stitches, balanced density, and smooth production results.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "Most embroidery digitizing orders are completed within 4–12 hours without compromising quality.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your artwork and files remain completely secure throughout the entire digitizing process.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our embroidery experts are always available to answer questions and assist with revisions.",
  },
];

const DigitizingFeatures = () => {
  return (
    <section className="relative bg-[#F5F7FA] py-20">

      {/* Decorative Glow */}
      <div className="absolute left-0 top-20 w-72 h-72 bg-[#007BFF]/5 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-72 h-72 bg-[#007BFF]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 p-8 text-center"
              >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">

                  <Icon
                    size={40}
                    className="text-[#007BFF]"
                  />

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  {feature.title}
                </h3>

                {/* Divider */}

                {/* Description */}
                <p className="text-slate-600 leading-7 mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default DigitizingFeatures;