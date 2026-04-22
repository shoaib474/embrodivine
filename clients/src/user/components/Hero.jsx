// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Scissors, ArrowRight } from "lucide-react";

// const Hero = () => {
//   return (
//     <>
//       <section className="h-screen relative pt-24 md:pt-32 pb-20 bg-black overflow-hidden">
//         {/* Background image overlay (same UI) */}
//         <div className="absolute inset-0 opacity-20">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("/images/embroidery-closeup.jpg")`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* LEFT CONTENT */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7 }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-block border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-6"
//               >
//                 ✨ Trusted by 1000+ Businesses
//               </motion.div>

//               {/* HEADING (SAME SIZE / SAME UI) */}
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 Professional Embroidery{" "}
//                 <span className="text-[#D4AF37]">Digitizing</span>
//               </h1>

//               {/* PARAGRAPH (SAME UI) */}
//               <p className="text-lg md:text-xl text-[#E8D7B5] mb-8 leading-relaxed">
//                 Transform your designs into flawless, machine-ready embroidery
//                 files. Expert digitizing with 24-hour turnaround and unlimited
//                 revisions.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* PRIMARY BUTTON (same shape) */}
//                 <Link
//                   to="/quote"
//                   className="inline-flex items-center justify-center bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transform hover:scale-105 transition-all"
//                 >
//                   Get a Free Quote
//                   <ArrowRight className="ml-2" size={20} />
//                 </Link>

//                 {/* OUTLINE BUTTON (same shape) */}
//                 <Link
//                   to="/collection"
//                   className="inline-flex items-center justify-center border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
//                 >
//                   View Collection
//                 </Link>
//               </div>
//             </motion.div>

//             {/* RIGHT IMAGE (UNCHANGED UI) */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="relative"
//             >
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/40">
//                 <img src="/images/embroidery-closeup.jpg" alt="Embroidery" />
//               </div>

//               {/* INFO CARD (same position / UI) */}
//               <div className="absolute -bottom-6 -right-6 bg-black border border-[#D4AF37] text-[#D4AF37] px-6 py-4 rounded-2xl shadow-xl">
//                 <p className="text-sm font-semibold">24-Hour Delivery</p>
//                 <p className="text-2xl font-bold">Guaranteed</p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="h-screen relative bg-black overflow-hidden flex items-center justify-center px-4">
      {/* Background video overlay */}
      <div className="absolute inset-0 opacity-30">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hnn.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl text-center"
      >
        <div className="inline-block border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-6">
          ✨ Trusted by 1000+ Businesses
        </div> 

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Professional Embroidery{" "}
          <span className="text-[#D4AF37]">Digitizing</span>
        </h1>

        <p className="text-lg md:text-xl text-[#E8D7B5] mb-8 leading-relaxed">
          Transform your designs into flawless, machine-ready embroidery files.
          Expert digitizing with 24-hour turnaround and unlimited revisions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transform hover:scale-105 transition-all"
          >
            Get a Free Quote
            <ArrowRight className="ml-2" size={20} />
          </Link>

          <Link
            to="/collection"
            className="inline-flex items-center justify-center border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
          >
            View Collection
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
