import {
  User,
  PieChart,
  ShieldCheck,
  Lock,
  Cookie,
  Mail,
  FileText,
} from "lucide-react";

const privacyItems = [
  {
    icon: User,
    title: "1. Information We Collect",
    description:
      "We collect information you provide directly, such as your name, email address, shipping address, phone number, and payment details when you create an account, request a quote, or place an order.",
  },
  {
    icon: PieChart,
    title: "2. How We Use Your Information",
    description:
      "Your information helps us process orders, deliver embroidery services, provide customer support, improve our website, personalize your experience, and send important order updates.",
  },
  {
    icon: ShieldCheck,
    title: "3. Information Sharing",
    description:
      "We never sell or rent your personal information. Your data is shared only with trusted third-party providers when necessary to complete your order, process payments, or improve our services.",
  },
  {
    icon: Lock,
    title: "4. Data Security",
    description:
      "We use industry-standard security measures including encrypted connections, secure servers, and restricted access to protect your personal information from unauthorized access or disclosure.",
  },
  {
    icon: Cookie,
    title: "5. Cookies",
    description:
      "Cookies help us improve your browsing experience, remember preferences, analyze website traffic, and provide a faster shopping experience. You can disable cookies in your browser settings.",
  },
  {
    icon: Mail,
    title: "6. Your Rights",
    description:
      "You may request access, correction, or deletion of your personal information. You may also unsubscribe from marketing emails at any time by following the unsubscribe link.",
  },
  {
    icon: FileText,
    title: "7. Policy Updates",
    description:
      "Our Privacy Policy may be updated occasionally. Any changes will be published on this page together with the updated effective date.",
  },
];

const PrivacyContent = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm overflow-hidden">
          {privacyItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-[180px_280px_1fr] items-center gap-8 p-8 md:p-10 transition-all duration-300 hover:bg-[#F8FBFF]
                ${
                  index !== privacyItems.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#EEF5FF] flex items-center justify-center">
                    <Icon
                      className="w-10 h-10 text-[#007BFF]"
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
                  <p className="text-slate-600 leading-8 text-lg">
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

export default PrivacyContent;
