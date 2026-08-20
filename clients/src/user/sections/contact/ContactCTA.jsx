import { Mail, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className=" px-4 sm:px-6 lg:px-8 pb-20 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl p-12 sm:p-16 text-center">
        <div className="relative space-y-6">
          <Phone className="w-12 h-12 text-[#007BFF] mx-auto animate-pulse" />

          <h2 className="text-3xl sm:text-4xl font-bold text-[#222222]">
            Prefer to Talk?
          </h2>

          <p className="text-[#333333] text-lg max-w-2xl mx-auto">
            Give us a call and speak directly with our embroidery experts
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to=""
              className="inline-flex items-center justify-center gap-2 bg-[#007BFF] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#007BFF]/20"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Link>

            <Link
              to="mailto:eembroideryhub@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#007BFF] text-[#007BFF] px-8 py-4 rounded-lg font-bold hover:bg-[#007BFF]/10 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
