import { UploadCloud, PenTool, Mail, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "STEP 1",
    title: "Upload Your Artwork",
    description:
      "Send us your logo, artwork, sketch, image, or embroidery idea through our quote form.",
    icon: UploadCloud,
  },
  {
    step: "STEP 2",
    title: "We Digitize It",
    description:
      "Our professional digitizers manually convert your artwork into a machine-ready embroidery file.",
    icon: PenTool,
  },
  {
    step: "STEP 3",
    title: "Receive Your Files",
    description:
      "Get your DST, PES, JEF, EXP, VP3, HUS or any required embroidery format.",
    icon: Mail,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.8;
      const end = rect.height + windowHeight * 0.2;

      const scrolled = start - rect.top;
      const percentage = (scrolled / end) * 100;

      setProgress(Math.max(0, Math.min(100, percentage)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FFFFFF] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-32">
            <span className="uppercase tracking-[4px] text-[#007BFF] text-sm font-semibold">
              How It Works
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mt-5 leading-tight">
              The process is fast and easy.
            </h2>

            <p className="text-[#333333] mt-6 leading-8">
              Getting your embroidery files has never been easier. Follow these
              three simple steps and receive production-ready files optimized
              for your embroidery machine.
            </p>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2 mt-8 bg-[#007BFF] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#0066CC] transition-all duration-300"
            >
              Get A Free Quote
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* Gray Line */}
            <div className="absolute left-6 top-0 w-[2px] h-full bg-[#E5E7EB]" />

            {/* Animated Blue Line */}
            <div
              className="absolute left-6 top-0 w-[2px] bg-[#007BFF] transition-all duration-200 ease-out"
              style={{
                height: `${progress}%`,
              }}
            />

            <div className="space-y-10">
              {steps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="flex gap-8 items-start relative">
                    <div className="w-12 h-12 rounded-full bg-[#007BFF] text-white flex items-center justify-center flex-shrink-0 z-10">
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 bg-[#F5F7FA] rounded-xl py-6 px-8">
                      <span className="text-[#007BFF] text-sm font-medium tracking-[3px] uppercase">
                        {item.step}
                      </span>

                      <h3 className="text-2xl font-bold text-[#222222] mt-2 mb-4">
                        {item.title}
                      </h3>

                      <p className="text-[#333333] leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
