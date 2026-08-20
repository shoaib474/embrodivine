import { Headphones, Mail, ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyCTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FBFF] to-white py-24">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* CTA Card */}
        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-r from-white to-[#F5F9FF] shadow-lg p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#EEF5FF] flex items-center justify-center shadow-md">
                <Headphones
                  className="w-12 h-12 text-[#007BFF]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#0F172A]">
                  Have Questions?
                </h2>

                <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-xl">
                  If you have any questions about this Privacy Policy, our team
                  is always happy to help.
                </p>
              </div>
            </div>

            {/* Button */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#007BFF] hover:bg-[#0066CC] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Us
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Effective Date */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white border border-slate-200 shadow-sm">
            <CalendarDays className="w-5 h-5 text-[#007BFF]" />

            <span className="font-semibold text-slate-700">
              Effective Date:
            </span>

            <span className="text-slate-500">January 1, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyCTA;
