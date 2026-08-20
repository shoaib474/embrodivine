import { ShieldCheck } from "lucide-react";

const PrivacyHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#007BFF]/5 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#007BFF]/5 rounded-full blur-3xl"></div>

      {/* Dots Left */}
      <div className="absolute top-24 left-8 hidden lg:block">
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
              YOUR PRIVACY IS IMPORTANT
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-[#0F172A]">
              Privacy <span className="text-[#007BFF]">Policy</span>
            </h1>

            <div className="w-24 h-1 bg-[#007BFF] rounded-full mt-8 mb-8"></div>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              At StitchCraft, we are committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your
              information.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center">
            {/* Main Card */}

            <div className="relative">
              <div className="absolute inset-0 bg-[#007BFF]/10 blur-3xl rounded-full"></div>

              <div className="relative bg-white rounded-[40px] shadow-2xl border border-slate-100 p-10">
                {/* Paper */}

                <div className="w-72 h-96 rounded-3xl bg-gradient-to-b from-white to-[#F5F7FA] border border-slate-100 shadow-lg rotate-6">
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-full bg-[#EEF5FF] mb-6"></div>

                    <div className="space-y-4">
                      <div className="h-4 rounded-full bg-slate-200"></div>

                      <div className="h-4 rounded-full bg-slate-200 w-5/6"></div>

                      <div className="h-4 rounded-full bg-slate-200 w-4/6"></div>
                    </div>

                    <div className="mt-10 space-y-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="h-3 rounded-full bg-slate-100"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shield */}

                <div className="absolute -left-16 top-24">
                  <div className="w-40 h-40 rounded-[40px] bg-gradient-to-br from-[#007BFF] to-[#0066CC] shadow-2xl flex items-center justify-center">
                    <ShieldCheck size={70} className="text-white" />
                  </div>
                </div>

                {/* Check */}

                <div className="absolute bottom-8 right-2 w-20 h-20 rounded-full bg-[#007BFF] shadow-xl flex items-center justify-center">
                  <svg
                    width="34"
                    height="34"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHero;
