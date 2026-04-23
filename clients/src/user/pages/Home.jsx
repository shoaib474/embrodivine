import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Award, DollarSign, Check, ArrowRight } from "lucide-react";

import Hero from "../components/Hero";
import FeaturedProducts from "../components/Featured";

import { useProducts } from "../../hooks/useProduct";

const Home = () => {
  const { data } = useProducts();

  const products = data?.products || data || [];

  const services = [
    {
      icon: "/images/logo-digitizing.webp",
      title: "Logo Digitizing",
      description:
        "Transform your brand logo into perfect embroidery-ready files with crisp details and professional finish.",
    },
    {
      icon: "/images/CAP-DIGITIZING.jpg",
      title: "Cap Digitizing",
      description:
        "Specialized digitizing for curved cap surfaces ensuring flawless stitching on hats and headwear.",
    },
    {
      icon: "/images/3d-puff.jpg",
      title: "3D Puff Embroidery",
      description:
        "Eye-catching raised embroidery that adds dimension and premium quality to your designs.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Design",
      description: "Send us your artwork or logo in any format",
    },
    {
      number: "02",
      title: "Digitizing",
      description: "Our experts convert it to stitch-perfect files",
    },
    {
      number: "03",
      title: "Send",
      description: "Receive machine-ready files within 24 hours",
    },
  ];

  const features = [
    {
      icon: <Zap className="text-[#D4AF37]" />,
      title: "Fast Turnaround",
      description: "24-hour delivery on most orders",
    },
    {
      icon: <Award className="text-[#D4AF37]" />,
      title: "Machine-Ready Files",
      description: "Compatible with all major embroidery machines",
    },
    {
      icon: <DollarSign className="text-[#D4AF37]" />,
      title: "Affordable Pricing",
      description: "Quality digitizing at competitive rates",
    },
    {
      icon: <Check className="text-[#D4AF37]" />,
      title: "Quality Guarantee",
      description: "Free revisions until you're satisfied",
    },
  ];

  return (
    <>
      <title>Home | Premium Embroidery Digitizing Fast & Reliable</title>

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8D7B5] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-wh/70 max-w-2xl mx-auto">
              Professional digitizing services tailored to your embroidery needs
            </p>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-[#1A1A1A] p-8 rounded-2xl border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:shadow-xl group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#E8D7B5] rounded-xl flex items-center justify-center text-[#1A1A1A] mb-6 group-hover:scale-110 transition-transform">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#E8D7B5] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#E8D7B5]/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: "#101010" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8D7B5] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#E8D7B5]/70">
              Simple, fast, and reliable process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 border-t-2 border-dashed border-[#D4AF37]/30 -translate-x-1/2"></div>
                  )}
                  <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#E8D7B5] rounded-full flex items-center justify-center text-[#1A1A1A] text-2xl font-bold mb-6 mx-auto">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-[#E8D7B5] mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-[#E8D7B5]/70 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATUED PRODUCTS */}
      <FeaturedProducts products={products} />

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8D7B5] mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-[#E8D7B5]/70">
              Quality and service you can trust
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#E8D7B5] rounded-full flex items-center justify-center text-[#1A1A1A] mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#E8D7B5] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#E8D7B5]/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-[#1A1A1A]"
        style={{ backgroundColor: "#101010" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#E8D7B5]">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-[#E8D7B5]/90">
            Get your free quote today and experience professional digitizing
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center bg-[#D4AF37] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Request a Quote <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
