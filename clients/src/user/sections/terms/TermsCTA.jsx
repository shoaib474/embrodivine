import {
  Headphones,
  Mail,
  ArrowRight,
  CalendarDays,
  FileCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const TermsCTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FBFF] to-white py-24">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      {/* Decorative Dots Left */}
      <div className="absolute left-8 top-20 hidden lg:block opacity-20">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      {/* Decorative Dots Right */}
      <div className="absolute right-8 bottom-20 hidden lg:block opacity-20">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* CTA Card */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0066CC] rounded-[36px] shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center p-10 md:p-16">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/20 text-white font-semibold mb-8">
                <FileCheck size={18} />
                TERMS SUPPORT
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Need Help Understanding
                <br />
                Our Terms?
              </h2>

              <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-xl">
                If you have questions regarding our Terms & Conditions, orders,
                payments, or policies, our support team is always ready to help.
              </p>
            </div>

            {/* Right */}

            <div className="flex flex-col items-center lg:items-end gap-8">
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl">
                <Headphones
                  className="w-14 h-14 text-[#007BFF]"
                  strokeWidth={1.7}
                />
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[#007BFF] font-bold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Contact Support
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Information */}

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Effective Date */}

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF5FF] flex items-center justify-center">
                <CalendarDays className="text-[#007BFF]" size={30} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Effective Date</p>

                <h3 className="text-2xl font-bold text-[#0F172A]">
                  January 1, 2026
                </h3>
              </div>
            </div>
          </div>

          {/* Contact */}

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF5FF] flex items-center justify-center">
                <Mail className="text-[#007BFF]" size={30} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Email Support</p>

                <h3 className="text-2xl font-bold text-[#0F172A]">
                  support@embrodivine.com
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsCTA;
