import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Sparkles,
  Scissors,
  Zap,
  Award,
  DollarSign,
  Check,
  ArrowRight,
} from "lucide-react";
import Hero from "../components/Hero";
const Home = () => {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#FFF4E6]" />,
      title: "Logo Digitizing",
      description:
        "Transform your brand logo into perfect embroidery-ready files with crisp details and professional finish.",
    },
    {
      icon: <Scissors className="w-8 h-8 text-[#FFF4E6]" />,
      title: "Cap Digitizing",
      description:
        "Specialized digitizing for curved cap surfaces ensuring flawless stitching on hats and headwear.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#FFF4E6]" />,
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
      title: "Delivery",
      description: "Receive machine-ready files within 24 hours",
    },
  ];
  const features = [
    {
      icon: <Zap className="text-[#FFF4E6]" />,
      title: "Fast Turnaround",
      description: "24-hour delivery on most orders",
    },
    {
      icon: <Award className="text-[#FFF4E6]" />,
      title: "Machine-Ready Files",
      description: "Compatible with all major embroidery machines",
    },
    {
      icon: <DollarSign className="text-[#FFF4E6]" />,
      title: "Affordable Pricing",
      description: "Quality digitizing at competitive rates",
    },
    {
      icon: <Check className="text-[#FFF4E6]" />,
      title: "Quality Guarantee",
      description: "Free revisions until you're satisfied",
    },
  ];
  return (
    <>
      <Helmet>
        <title>StitchPro - Professional Embroidery Digitizing Services</title>
        <meta
          name="description"
          content="Expert embroidery digitizing services. Logo, cap, and 3D puff digitizing with 24-hour turnaround. Machine-ready files for all embroidery machines."
        />
      </Helmet>
      {/* Hero Section */} <Hero /> {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#78866B] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#78866B]/70 max-w-2xl mx-auto">
              Professional digitizing services tailored to your embroidery needs
            </p>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-[#FFF4E6] p-8 rounded-2xl border-2 border-dashed border-[#D8A657]/30 hover:border-[#D8A657] transition-all hover:shadow-xl group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D8A657] to-[#B7410E] rounded-xl flex items-center justify-center text-[#FFF4E6] mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#78866B] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#78866B]/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-[#78866B]/5 to-[#D8A657]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#78866B] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#78866B]/70">
              Simple, fast, and reliable process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 border-t-2 border-dashed border-[#D8A657]/30 -translate-x-1/2"></div>
                  )}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D8A657] to-[#B7410E] rounded-full flex items-center justify-center text-[#FFF4E6] text-2xl font-bold mb-6 mx-auto">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-[#78866B] mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-[#78866B]/70 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#78866B] mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-[#78866B]/70">
              Quality and service you can trust
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#FFF4E6] p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#78866B] to-[#D8A657] rounded-full flex items-center justify-center text-[#FFF4E6] mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#78866B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#78866B]/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#78866B] to-[#D8A657] text-[#FFF4E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-[#FFF4E6]/90">
            Get your free quote today and experience professional digitizing
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-[#78866B] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Request a Quote <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
};
export default Home;
