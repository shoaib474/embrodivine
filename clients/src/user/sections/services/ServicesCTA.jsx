import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesCTA = () => {
  return (
    <section className="bg-[#F5F7FA] px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative overflow-hidden rounded-2xl p-12 sm:p-16 text-center max-w-7xl mx-auto">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#007BFF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#007BFF] rounded-full blur-3xl"></div>
        </div>

        <div className="relative space-y-6">
          <Star className="w-12 h-12 text-[#007BFF] mx-auto animate-pulse" />

          <h2 className="text-3xl sm:text-4xl font-bold text-[#222222]">
            Ready to Start Your Project?
          </h2>

          <p className="text-[#333333] text-lg max-w-2xl mx-auto">
            Get a free quote today and let's bring your vision to life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/quote"
              className="bg-[#007BFF] text-white px-8 py-4 mx-4 rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#007BFF]/20"
            >
              Get Free Quote
            </Link>

            <Link
              to="/contact"
              className="bg-transparent border-2 border-[#007BFF] text-[#007BFF] px-8 py-4 rounded-lg font-bold hover:bg-[#007BFF]/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
