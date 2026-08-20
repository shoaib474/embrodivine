import { Home, Grid3X3, Headphones, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {/* Decorative Dots */}
      <div className="absolute top-16 left-8 opacity-20">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      <div className="absolute top-52 right-8 opacity-20">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#007BFF]" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* 404 */}
        <button
          onClick={() => window.history.back()}
          className="hidden md:flex items-center gap-2 px-6 py-3 border border-[#007BFF]/20 rounded-full text-[#007BFF] font-semibold hover:bg-[#007BFF] hover:text-white transition-all"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <h1 className="text-[120px] md:text-[220px] font-black leading-none tracking-tight text-[#007BFF] drop-shadow-lg">
              404
            </h1>

            {/* Needle */}
            <div className="absolute left-1/2 top-6 md:top-10 -translate-x-1/2">
              <div className="w-1 h-36 md:h-52 bg-slate-300 rounded-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-slate-400 rounded-full"></div>
              </div>

              <svg className="absolute top-20 -left-8" width="80" height="120">
                <path
                  d="M40 0 C80 40 0 60 40 120"
                  stroke="#007BFF"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-[#0F172A]">
            Oops! <span className="text-[#007BFF]">Page Not Found</span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            The page you're looking for seems to have gone off the stitch path.
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center my-10">
            <div className="w-72 border-t-2 border-dashed border-[#007BFF]/40"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#007BFF] text-white rounded-xl font-bold hover:bg-[#0066CC] transition-all"
            >
              <Home size={20} />
              Go to Homepage
            </Link>

            <Link
              to="/category"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#007BFF]/20 text-[#007BFF] rounded-xl font-bold hover:bg-[#007BFF]/5 transition-all"
            >
              <Grid3X3 size={20} />
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Bottom Support Card */}
        <div className="mt-20">
          <div className="bg-white border border-slate-100 rounded-[30px] p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#007BFF] text-white flex items-center justify-center">
                <Headphones size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Need Help?
                </h3>
                <p className="text-slate-500">
                  Our support team is here for you 24/7.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#007BFF]/20 rounded-full text-[#007BFF] font-semibold hover:bg-[#007BFF] hover:text-white transition-all"
            >
              Contact Support
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
