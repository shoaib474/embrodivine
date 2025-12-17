import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | StitchPro</title>
      </Helmet>

      <section className="pt-24 md:pt-32 pb-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF4E6] via-[#FFF4E6] to-[#D8A657]/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Scissors className="w-32 h-32 text-[#78866B]/20 mx-auto" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-[#78866B] mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-[#78866B] mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-[#78866B]/70 mb-8">
              Oops! This thread seems to have gotten tangled. The page you're
              looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Back to Home
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
