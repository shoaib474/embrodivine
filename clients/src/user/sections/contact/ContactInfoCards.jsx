import { Mail } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ContactInfoCards = () => {
  const contactInfo = [
    // {
    //   icon: Phone,
    //   title: "Phone",
    //   details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    //   link: "tel:+15551234567",
    // },
    {
      icon: Mail,
      title: "Email",
      details: ["eembroideryhub@gmail.com"],
      link: "mailto:eembroideryhub@gmail.com",
    },
    // {
    //   icon: Clock,
    //   title: "Business Hours",
    //   details: ["24/7"],
    //   link: null,
    // },
  ];

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, idx) => {
          const Icon = info.icon;
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] rounded-xl border border-[#007BFF]/15 p-6 hover:border-[#007BFF] transition-all duration-500 hover:shadow-xl hover:shadow-[#007BFF]/10 transform hover:-translate-y-2 group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div className="w-14 h-14 bg-[#007BFF]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#007BFF] transition-all duration-300">
                <Icon
                  className="w-7 h-7 text-[#007BFF] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-lg font-bold text-[#222222] mb-3">
                {info.title}
              </h3>

              <div className="space-y-1">
                {info.details.map((detail, i) => (
                  <p key={i} className="text-[#333333] text-sm">
                    {info.link ? (
                      <Link
                        to={info.link}
                        className="hover:text-[#007BFF] transition-colors"
                      >
                        {detail}
                      </Link>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactInfoCards;
