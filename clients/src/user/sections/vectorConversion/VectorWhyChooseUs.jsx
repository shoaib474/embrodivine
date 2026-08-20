import { ArrowRight } from "lucide-react";

const VectorWhyChooseUs = () => {
  return (
    <section className="bg-[#f5f7fa] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative flex justify-center items-center">
            {/* Sketch */}
            <div className="w-[280px] md:w-3/4 z-10">
              <img
                src="/images/fritolay.png"
                alt="Sketch"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <span className="inline-block text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">
              Why Choose Embrodivine
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#222222] leading-tight">
              Transform Your Artwork Into
              <span className="text-blue-600"> Clean Vector Graphics</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every logo is manually redrawn by experienced vector artists. We
              deliver crisp, scalable artwork that is perfect for printing,
              embroidery, screen printing, signage, laser engraving, and every
              professional production process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VectorWhyChooseUs;
