import React from "react";
import { ShieldCheck, Eye, CreditCard, FileText } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Customer Satisfaction",
      desc: "Unlimited revisions and support until you're completely satisfied.",
    },
    {
      icon: Eye,
      title: "Design Backup Facility",
      desc: "Your embroidery files are stored securely for future revisions.",
    },
    {
      icon: CreditCard,
      title: "Pay After Approval",
      desc: "Review the digitized file first and pay only when satisfied.",
    },
    {
      icon: FileText,
      title: "Free Stitch Quote",
      desc: "Fast and accurate embroidery digitizing quotes at no cost.",
    },
  ];

  return (
    <section className="bg-[#ffffff] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[4px] text-[#007BFF] text-sm font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mt-4">
            Built For Quality
          </h2>

          <p className="text-[#333333] max-w-2xl mx-auto mt-5">
            We provide premium embroidery digitizing services with fast
            turnaround, secure file storage, unlimited support, and
            production-ready results.
          </p>
        </div>

        {/* Top Cards */}
        <div className="md:flex items-center justify-around text-center gap-8 space-y-8 md:space-y-0 mb-10">
          <div className="bg-white rounded-lg overflow-hidden p-4 w-full md:w-1/3 shadow-sm border border-gray-100">
            <img
              src="/images/resewout.webp"
              alt="Real Sewouts"
              className="w-full h-64 object-cover rounded-lg"
            />

            <div className="pt-8 pb-2">
              <span className="inline-block text-[#007BFF] text-xs font-bold px-4 py-2 rounded-full mb-2">
                FREE
              </span>

              <h3 className="text-2xl font-bold text-[#222222]">
                Real Sewouts
              </h3>

              <p className="text-[#333333] mt-2">
                Preview exactly how your design will look before production.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden p-4 w-full md:w-1/3 shadow-sm border border-gray-100">
            <img
              src="/images/high-quality.webp"
              alt="High Quality Service"
              className="w-full h-64 object-cover rounded-lg"
            />

            <div className="pt-8 pb-2">
              <span className="inline-block text[#007BFF] text-xs font-bold px-4 py-2 rounded-full mb-2">
                PREMIUM
              </span>

              <h3 className="text-2xl font-bold text-[#222222]">
                High Quality Service
              </h3>

              <p className="text-[#333333] mt-2">
                Professional digitizing optimized for clean stitching and
                perfect embroidery results.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-[1fr_450px] gap-10 items-center">
          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg px-4 py-6 text-center shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 m-auto rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-[#007BFF]" />
                  </div>

                  <h3 className="text-[#222222] font-bold text-lg mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[#333333] leading-7 text-sm">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src="/images/why-choose-us.webp"
              alt="Embroidery Process"
              className="max-w-full w-[420px] object-contain drop-shadow-[0_0_40px_rgba(0,123,255,0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
