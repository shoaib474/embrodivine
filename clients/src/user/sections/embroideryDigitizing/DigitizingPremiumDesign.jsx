import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EmbroideryPremiumDesign = () => {
  return (
    <section className="bg-[#ffffff] py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/images/digitizing/car_digitizing.webp"
              alt="Premium Embroidery Design"
              className="w-full max-w-xl drop-shadow-2xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <p className="text-blue-600 font-semibold tracking-widest uppercase">
              SEE OUR QUALITY FOR YOURSELF!
            </p>
            <h2 className="mt-2 text-5xl font-extrabold leading-tight text-[#4f4f4f]">
              Discover Our Exclusive
              <br />
              Embroidery Design Collection
            </h2>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/store"
                className="group bg-[#007BFF] hover:bg-[#0066CC] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-colors duration-300"
              >
                Shop Designs
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmbroideryPremiumDesign;
