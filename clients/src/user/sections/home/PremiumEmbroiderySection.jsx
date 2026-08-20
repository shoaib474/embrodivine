import React from "react";
import { Link } from "react-router-dom";

const PremiumEmbroiderySection = () => {
  return (
    <section className="bg-gradient-to-r from-[#007BFF] to-[#0066CC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mobile Images */}
          <div className="flex justify-center">
            <img
              src="/images/website-mobile-mockup.webp"
              alt="EmbroDivine Mobile"
              className="max-w-full drop-shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left text-white">
            <span className="text-white/80 font-semibold tracking-[3px] uppercase text-sm">
              Mobile Experience
            </span>

            <h2 className="mt-4 text-5xl font-bold leading-tight">
              Premium Embroidery Designs
              <br />
              Ready To Download
            </h2>

            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              Discover thousands of professionally crafted embroidery designs
              compatible with DST, PES, JEF and more.
            </p>

            <ul className="mt-8 space-y-4 text-white/90">
              <li>✓ Instant Digital Downloads</li>
              <li>✓ Commercial Use Designs</li>
              <li>✓ Premium Stitch Quality</li>
              <li>✓ Multiple Machine Formats</li>
            </ul>

            <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
              <Link
                to="/store"
                className="px-8 py-4 bg-white text-[#007BFF] font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Browse Designs
              </Link>

              <Link
                to="/quote"
                className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition"
              >
                Get A Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumEmbroiderySection;
