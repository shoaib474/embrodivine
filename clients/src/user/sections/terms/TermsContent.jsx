import {
  FileText,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  Copyright,
  ShieldCheck,
  AlertTriangle,
  Scale,
} from "lucide-react";

const terms = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    description:
      "By accessing or using our website, placing an order, or requesting our embroidery services, you agree to comply with these Terms & Conditions. If you do not agree, please discontinue using our services.",
  },
  {
    icon: ShoppingBag,
    title: "2. Orders & Services",
    description:
      "All embroidery digitizing, vector conversion, patches, and custom embroidery orders are subject to review and acceptance. We reserve the right to refuse or cancel orders that violate copyright, trademarks, or our policies.",
  },
  {
    icon: CreditCard,
    title: "3. Payments",
    description:
      "Payments must be completed before production begins unless otherwise agreed. Prices are listed in the applicable currency and may change without prior notice.",
  },
  {
    icon: RefreshCw,
    title: "4. Refund & Revisions",
    description:
      "Customer satisfaction is important to us. Minor revisions are provided according to our revision policy. Refund eligibility depends on the nature of the order and completed work.",
  },
  {
    icon: Copyright,
    title: "5. Intellectual Property",
    description:
      "Customers must own or have permission to use any logos, artwork, or designs submitted to us. We are not responsible for copyright or trademark violations resulting from customer-provided files.",
  },
  {
    icon: ShieldCheck,
    title: "6. Privacy & Security",
    description:
      "We protect your personal information using secure technologies. Please review our Privacy Policy to understand how your information is collected, stored, and processed.",
  },
  {
    icon: AlertTriangle,
    title: "7. Limitation of Liability",
    description:
      "We are not liable for indirect, incidental, or consequential damages arising from the use of our website or services. Our maximum liability is limited to the amount paid for the order.",
  },
  {
    icon: Scale,
    title: "8. Changes to Terms",
    description:
      "These Terms & Conditions may be updated from time to time. Continued use of our website after changes indicates your acceptance of the revised terms.",
  },
];

const TermsContent = () => {
  return (
    <section className="relative bg-white py-24">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-20 w-72 h-72 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

        <div className="absolute right-0 bottom-20 w-72 h-72 rounded-full bg-[#007BFF]/5 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Heading */}

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EEF5FF] border border-[#007BFF]/20 text-[#007BFF] font-semibold">
            <FileText size={18} />
            TERMS OVERVIEW
          </div>

          <h2 className="mt-8 text-4xl md:text-5xl font-black text-[#0F172A]">
            Important Information
          </h2>

          <div className="w-24 h-1 bg-[#007BFF] rounded-full mx-auto mt-6"></div>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            These terms explain the rules, responsibilities, and policies that
            apply when using our embroidery services and website.
          </p>
        </div>

        {/* Card */}

        <div className="bg-white border border-slate-200 rounded-[32px] shadow-lg overflow-hidden">
          {terms.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-[160px_280px_1fr] gap-8 items-center p-8 md:p-10 transition-all duration-300 hover:bg-[#F8FBFF]
                ${
                  index !== terms.length - 1 ? "border-b border-slate-200" : ""
                }`}
              >
                {/* Icon */}

                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#EEF5FF] flex items-center justify-center">
                    <Icon
                      size={38}
                      className="text-[#007BFF]"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Title */}

                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}

                <div className="lg:border-l lg:border-slate-200 lg:pl-10">
                  <p className="text-slate-600 text-lg leading-8">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TermsContent;
