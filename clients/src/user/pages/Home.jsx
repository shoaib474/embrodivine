import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Award, DollarSign, Check, ArrowRight } from "lucide-react";

import Hero from "../sections/home/Hero";
import ServicesSection from "../sections/home/ServicesSection";
import HowItWorks from "../sections/home/HowItWorks";
import FeaturedProducts from "../sections/home/Featured";
import WhyChooseUs from "../sections/home/WhyChooseUs";
import PremiumEmbroiderySection from "../sections/home/PremiumEmbroiderySection";
import ReviewSection from "../sections/home/ReviewSection";

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
      <PremiumEmbroiderySection />

      <ReviewSection />
    </>
  );
};

export default Home;
