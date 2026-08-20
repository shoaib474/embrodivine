import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-screen relative overflow-hidden flex items-center justify-center px-4 border-b border-gray-300">
      {/* Background Video */}
      <div className="absolute inset-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hnn.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative max-w-3xl text-center"
      >
        {/* Badge */}
        <div className="inline-block border border-[#007BFF]/40 text-[#0066CC] px-5 py-2 rounded-full text-sm font-semibold mb-6 bg-white/70 backdrop-blur-md">
          ✨ Trusted by 1000+ Businesses
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#222222] mb-6 leading-tight">
          Where Detail Comes True
        </h1>

        {/* Sub text */}
        <p className="text-lg md:text-xl text-[#333333] mb-10 leading-relaxed">
          Because extraordinary brands are remembered by the details others
          overlook. Crafted with precision, built to elevate every stitch, edge,
          and impression.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center bg-[#007BFF] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0066CC] hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
          >
            Get a Free Quote
            <ArrowRight className="ml-2" size={20} />
          </Link>

          <Link
            to="/store"
            className="inline-flex items-center justify-center border border-[#007BFF] text-[#0066CC] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#007BFF] hover:text-white transition-all"
          >
            View Products
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
