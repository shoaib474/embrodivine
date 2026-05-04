import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-screen relative bg-[#0b0b0f] overflow-hidden flex items-center justify-center px-4">
      {/* Background Video */}
      <div className="absolute inset-0 opacity-25">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hnn.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative max-w-3xl text-center"
      >
        {/* Badge */}
        <div className="inline-block border border-yellow-500/40 text-yellow-400 px-5 py-2 rounded-full text-sm font-semibold mb-6 bg-[#111827]/40 backdrop-blur-md">
          ✨ Trusted by 1000+ Businesses
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Premium Embroidery <span className="text-yellow-500">Digitizing</span>
        </h1>

        {/* Sub text */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Transform your designs into flawless, machine-ready embroidery files.
          High-quality digitizing, vector art & patches with fast 24-hour
          delivery.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-500/20"
          >
            Get a Free Quote
            <ArrowRight className="ml-2" size={20} />
          </Link>

          <Link
            to="/collection"
            className="inline-flex items-center justify-center border border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 hover:text-black transition-all"
          >
            View Collection
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
