import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Services = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const services = [
    {
      title: "Logo Digitizing",
      description:
        "Professional conversion of your brand logo into high-quality embroidery files. Perfect for corporate branding, uniforms, and promotional items.",
      features: [
        "Vector-quality output",
        "Multiple file formats",
        "Color matching",
        "Unlimited revisions",
      ],
      price: "From $15",
    },
    {
      title: "Cap Digitizing",
      description:
        "Specialized digitizing optimized for curved cap surfaces. Ensures your designs look perfect on all types of headwear.",
      features: [
        "Curved surface optimization",
        "3D visualization",
        "Size adjustments",
        "Format compatibility",
      ],
      price: "From $20",
    },
    {
      title: "3D Puff Embroidery",
      description:
        "Create eye-catching raised embroidery that adds depth and dimension to your designs. Perfect for premium branding.",
      features: [
        "Raised stitch effect",
        "Premium appearance",
        "Durable quality",
        "Custom heights",
      ],
      price: "From $25",
    },
    {
      title: "Patch Digitizing",
      description:
        "Custom patch designs for jackets, uniforms, and accessories. Detailed work with perfect edge stitching.",
      features: [
        "Custom shapes",
        "Border options",
        "Iron-on backing",
        "Velcro compatible",
      ],
      price: "From $18",
    },
    {
      title: "Applique Digitizing",
      description:
        "Fabric layered embroidery technique for bold, colorful designs with reduced stitch counts.",
      features: [
        "Cost-effective",
        "Bold designs",
        "Fabric recommendations",
        "Placement guides",
      ],
      price: "From $22",
    },
    {
      title: "Custom Digitizing",
      description:
        "Unique and complex designs requiring specialized attention. From portraits to intricate artwork.",
      features: [
        "Custom consulting",
        "Unlimited complexity",
        "Test stitchouts",
        "Expert guidance",
      ],
      price: "Custom Quote",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services - Professional Embroidery Digitizing | StitchPro</title>
        <meta
          name="description"
          content="Comprehensive embroidery digitizing services including logo, cap, 3D puff, patch, and applique digitizing. Fast turnaround and quality guaranteed."
        />
      </Helmet>

      <section className="pt-24 md:pt-32 pb-20 bg-gradient-to-br from-[#FFF4E6] via-[#FFF4E6] to-[#78866B]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#78866B] mb-6">
              Our Services
            </h1>
            <p className="text-xl text-[#78866B]/70 max-w-3xl mx-auto">
              Professional embroidery digitizing services for every need.
              Quality craftsmanship meets modern technology.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-[#FFF4E6]"
              >
                <div className="bg-gradient-to-br from-[#D8A657] to-[#B7410E] p-6">
                  <h3 className="text-2xl font-bold text-[#FFF4E6] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-[#FFF4E6]">
                    {service.price}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-[#78866B]/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-[#D8A657] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-[#78866B]/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-6 block text-center bg-[#78866B] text-[#FFF4E6] px-6 py-3 rounded-full font-semibold hover:bg-[#D8A657] transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
