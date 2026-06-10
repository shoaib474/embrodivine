import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Award, DollarSign, Check, ArrowRight } from "lucide-react";

import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import FeaturedProducts from "../components/Featured";
import ReviewSection from "../components/ReviewSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";

import { useProducts } from "../../hooks/useProduct";

const Home = () => {
  const { data } = useProducts();

  const products = data?.products || [];

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
      <HowItWorks />

      {/* FEATUED PRODUCTS */}
      <FeaturedProducts products={products} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="bg-[#1A1A1A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mobile Images */}
            <div className="flex justify-center">
              <img
                src="/images/website-mobile-mockup.webp"
                alt="EmbroDivine Mobile"
                className="max-w-full"
              />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <h2 className="mt-4 text-5xl font-bold text-white leading-tight ">
                Premium Embroidery Designs
                <br />
                Ready To Download
              </h2>

              <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                Discover thousands of professionally crafted embroidery designs
                compatible with DST, PES, JEF and more.
              </p>

              <ul className="mt-8 space-y-4 text-gray-300">
                <li>✓ Instant Digital Downloads</li>
                <li>✓ Commercial Use Designs</li>
                <li>✓ Premium Stitch Quality</li>
                <li>✓ Multiple Machine Formats</li>
              </ul>

              <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
                <Link
                  to="/store"
                  className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg"
                >
                  Browse Designs
                </Link>

                <Link
                  to="/quote"
                  className="px-8 py-4 border border-yellow-500 text-yellow-500 rounded-lg"
                >
                  Get A Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
    </>
  );
};

export default Home;
