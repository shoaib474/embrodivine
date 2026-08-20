import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ServicesFaq = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "We accept all common formats including JPG, PNG, PDF, AI, EPS, and SVG. If you have a different format, feel free to contact us.",
    },
    {
      q: "Is there a minimum order requirement?",
      a: "No minimum order required. You can order a single digitizing or vector file.",
    },
    {
      q: "How long does it take to receive my file?",
      a: "Delivery time depends on the design complexity, but most files are completed within a short turnaround time.",
    },
    {
      q: "What will I receive after placing an order?",
      a: "You will receive a professional embroidery digitizing or vector file ready for use in your production workflow.",
    },
    {
      q: "Can I request changes to my file?",
      a: "Yes, minor adjustments can be requested to ensure your file meets your requirements.",
    },
    {
      q: "What if I need help with my design?",
      a: "You can contact us anytime for support regarding your design or file requirements.",
    },
  ];

  return (
    <section className="bg-[#ffffff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#007BFF]">
            Frequently Asked Questions
          </h2>

          <p className="text-[#333333] text-lg">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#007BFF] transition-all duration-300"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F5F7FA] transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-[#222222] pr-4">
                  {faq.q}
                </h3>

                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#007BFF]/10 flex items-center justify-center transform transition-transform duration-300 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                >
                  <ArrowRight className="w-4 h-4 text-[#007BFF] rotate-90" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeFaq === idx ? "max-h-48" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[#333333] leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFaq;
