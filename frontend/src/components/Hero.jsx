import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section className="relative pt-24 md:pt-32 pb-20 bg-gradient-to-br from-[#FFF4E6] via-[#FFF4E6] to-[#D8A657]/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("/images/embroidery-closeup.jpg")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-[#D8A657]/20 text-[#B7410E] px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                ✨ Trusted by 1000+ Businesses
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#78866B] mb-6 leading-tight">
                Professional Embroidery{" "}
                <span className="text-[#D8A657]">Digitizing</span>
              </h1>
              <p className="text-lg md:text-xl text-[#78866B]/80 mb-8 leading-relaxed">
                Transform your designs into flawless, machine-ready embroidery
                files. Expert digitizing with 24-hour turnaround and unlimited
                revisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center border-2 border-[#78866B] text-[#78866B] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#78866B] hover:text-[#FFF4E6] transition-all"
                >
                  View Portfolio
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src="/images/embroidery-closeup.jpg" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#B7410E] text-[#FFF4E6] px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-semibold">24-Hour Delivery</p>
                <p className="text-2xl font-bold">Guaranteed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
