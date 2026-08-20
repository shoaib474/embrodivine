import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCTA = () => {
  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="backdrop-blur-lg border border-white/20 rounded-[32px] p-10 md:p-16 text-center bg-gradient-to-r from-[#007BFF] to-[#0066CC]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8">
            ✦ READY TO GET STARTED?
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Turn Your Design Into
            <span className="block text-white/90">Premium Embroidery</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Upload your artwork and let our experts create high-quality
            embroidery files with fast turnaround and guaranteed satisfaction.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#007BFF] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCTA;
