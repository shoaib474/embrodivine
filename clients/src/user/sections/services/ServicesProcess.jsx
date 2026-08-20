import {
  Upload,
  PenTool,
  Shirt,
  SearchCheck,
  Truck,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Headphones,
  Settings,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Artwork",
    description:
      "Send us your logo or design in any format. We’ll handle everything from here.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Professional Digitizing",
    description:
      "Our experts convert your design into a precise, production-ready vector file.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Receive Your Vector File",
    description:
      "Get your finalized vector file delivered directly to your email, ready for use.",
    icon: Truck,
  },
];

const ServicesProcess = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] py-24">
      {/* Decorative circles */}
      <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-[#007BFF]/5"></div>
      <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-[#007BFF]/5"></div>

      {/* Dots Left */}
      <div className="absolute top-16 left-6 hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      {/* Dots Right */}
      <div className="absolute top-24 right-6 hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="items-center gap-2 px-5 py-2 text-[#007BFF] font-semibold text-sm">
            SIMPLE PROCESS
          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-bold text-[#0F172A]">
            How It <span className="text-[#007BFF]">Process</span>
          </h2>

          <div className="w-24 h-1 bg-[#007BFF] rounded-full mx-auto mt-6"></div>

          <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
            From your idea to the final stitch — we make it easy, fast, and
            hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative group">
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-28 -right-10 z-10 items-center">
                      <div className="w-14 border-t-2 border-dashed border-[#007BFF]"></div>
                      <ArrowRight className="w-5 h-5 text-[#007BFF]" />
                    </div>
                  )}

                  <div className="bg-white rounded-[30px] shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                    {/* Step Number */}
                    <div className="flex justify-center pt-5">
                      <div className="w-16 h-16 rounded-full bg-[#007BFF] text-white text-2xl font-bold flex items-center justify-center shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    <div className="px-8 pb-10 pt-4 text-center">
                      {/* Icon */}
                      <div className="w-28 h-28 rounded-full bg-[#EEF5FF] mx-auto flex items-center justify-center mb-8">
                        <Icon
                          className="w-12 h-12 text-[#007BFF]"
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {step.title}
                      </h3>

                      <div className="w-14 h-1 bg-[#007BFF] rounded-full mx-auto mb-5"></div>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 w-full">
                      <svg
                        viewBox="0 0 500 100"
                        preserveAspectRatio="none"
                        className="w-full h-16"
                      >
                        <path
                          d="M0,50 C120,100 220,10 500,70 L500,100 L0,100 Z"
                          fill="#EEF5FF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesProcess;
