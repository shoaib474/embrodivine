import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Award, DollarSign, Check, ArrowRight } from "lucide-react";

import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import FeaturedProducts from "../components/Featured";

import { useProducts } from "../../hooks/useProduct";

const Home = () => {
  const { data } = useProducts();

  const products = data?.products || data || [];

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
      <ServicesSection />

      {/* How It Works */}
      <section className="py-20 bg-[#101010]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8D7B5] mb-4">
        How It Works
      </h2>
      <p className="text-lg text-[#E8D7B5]/70">
        Simple, fast, and reliable process
      </p>
    </div>

    {/* Steps */}
    <div className="grid md:grid-cols-3 gap-10 relative">

      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center">

          {/* Connector line (desktop only) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-10 left-full w-full h-0.5 border-t-2 border-dashed border-[#D4AF37]/30 -translate-x-1/2 z-0"></div>
          )}

          {/* Card */}
          <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 relative z-10 w-full">

            {/* Number Circle */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#E8D7B5] rounded-full flex items-center justify-center text-[#1A1A1A] text-2xl font-bold mb-6 mx-auto shadow-md">
              {step.number}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#E8D7B5] mb-3 text-center">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-[#E8D7B5]/70 text-center leading-relaxed">
              {step.description}
            </p>
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
