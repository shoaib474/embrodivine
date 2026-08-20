import { ShieldCheck, CheckCircle2 } from "lucide-react";

const TermsHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#007BFF]/5 blur-3xl"></div>

      {/* Left Dots */}
      <div className="absolute top-24 left-8 hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      {/* Right Dots */}
      <div className="absolute top-12 right-8 hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24 pt-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <div>
            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#007BFF]/5 border border-[#007BFF]/20 text-[#007BFF] font-semibold mb-8">
              <ShieldCheck size={18} />
              FAIR • TRANSPARENT • TRUSTED
            </div>

            {/* Heading */}

            <h1 className="text-5xl lg:text-7xl font-black text-[#0F172A] leading-tight">
              Terms & <span className="text-[#007BFF]">Conditions</span>
            </h1>

            <div className="w-24 h-1 bg-[#007BFF] rounded-full mt-8 mb-8"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Please read these Terms & Conditions carefully before using our
              website and embroidery services.
            </p>
          </div>

          {/* Right Illustration */}

          <div className="flex justify-center">
            <div className="relative">
              {/* Glow */}

              <div className="absolute inset-0 bg-[#007BFF]/10 rounded-full blur-3xl"></div>

              {/* Clipboard */}

              <div className="relative bg-white border border-slate-200 rounded-[36px] shadow-2xl p-8 rotate-2">
                {/* Clip */}

                <div className="absolute left-1/2 -translate-x-1/2 -top-5 w-24 h-10 rounded-xl bg-gradient-to-b from-[#3A8BFF] to-[#007BFF] shadow-lg"></div>

                <div className="w-80 rounded-3xl bg-gradient-to-b from-white to-[#F5F7FA] border border-slate-100 p-8">
                  <h3 className="text-center text-3xl font-black text-[#0F172A] mb-8">
                    TERMS &
                    <br />
                    CONDITIONS
                  </h3>

                  <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <CheckCircle2 className="text-[#007BFF]" size={24} />

                        <div className="flex-1 h-3 rounded-full bg-slate-200"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shield */}

                <div className="absolute -left-12 bottom-6">
                  <div className="w-32 h-32 rounded-[28px] bg-gradient-to-br from-[#007BFF] to-[#0066CC] flex items-center justify-center shadow-2xl">
                    <ShieldCheck className="text-white" size={58} />
                  </div>
                </div>

                {/* Pen */}

                <div className="absolute -right-8 bottom-10 rotate-[25deg]">
                  <div className="w-5 h-36 rounded-full bg-gradient-to-b from-[#6EA8FF] via-[#007BFF] to-[#0059B8] shadow-lg"></div>

                  <div className="w-5 h-5 bg-slate-300 rounded-b-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsHero;
