import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is embroidery digitizing?",
    answer:
      "Embroidery digitizing is the process of converting your logo or artwork into a stitch file that embroidery machines can read. It ensures clean stitching, proper thread paths, and professional embroidery results.",
  },
  {
    question: "Which embroidery file formats do you provide?",
    answer:
      "We provide all major embroidery formats including DST, PES, EXP, JEF, VP3, HUS, XXX, and many more. Just let us know your machine model when placing your order.",
  },
  {
    question: "How fast is your turnaround time?",
    answer:
      "Our standard turnaround time is 4–12 hours. Rush delivery options are also available for urgent projects.",
  },
  {
    question: "Can you digitize complex logos and artwork?",
    answer:
      "Yes. Our experienced digitizers can handle simple text logos, 3D puff designs, left chest logos, jacket backs, cap embroidery, patches, and highly detailed artwork.",
  },
  {
    question: "Do you offer free revisions?",
    answer:
      "Absolutely! If any adjustments are needed, we'll revise your embroidery file until you're satisfied, provided the requested changes match the original artwork.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply upload your artwork, choose your required options, complete the checkout, and our digitizing team will start working on your design immediately.",
  },
];

const DigitizingFAQ = () => {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="bg-[#f7f5fa] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-[#222222]">
            Got Questions?
            <span className="text-[#007BFF]"> We've Got Answers.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Everything you need to know about our embroidery digitizing
            services, turnaround times, file formats, revisions, and ordering
            process.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`overflow-hidden  border transition-all duration-300 ${
                active === index
                  ? "border-[#007BFF] shadow-xl"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between bg-white px-7 py-6 text-left"
              >
                <h3 className="text-lg font-semibold text-[#222]">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    active === index
                      ? "rotate-180 text-[#007BFF]"
                      : "text-gray-500"
                  }`}
                />
              </button>

              {active === index && (
                <div className="px-7 pb-7 text-gray-600 leading-8">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default DigitizingFAQ;
