import { Star, ArrowRight, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff]">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#007BFF] rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-[#007BFF]/30 rounded-full text-[#007BFF] text-sm font-semibold backdrop-blur-sm shadow-sm">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#222222] tracking-tight">
            Contact Us
            <span className="block text-[#007BFF] mt-2">
              We're Here to Help
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-[#333333] max-w-3xl mx-auto leading-relaxed">
            Have questions about our embroidery services? We'd love to hear from
            you.
          </p>

          {/* Button */}
          {/* <Link
            to="/quote"
            className="inline-flex items-center gap-3 bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#007BFF]/20 mt-8"
          >
            Get A Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
