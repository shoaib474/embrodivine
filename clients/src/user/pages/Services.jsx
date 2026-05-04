import React, { useState } from "react";
import {
  Scissors,
  Palette,
  Sparkles,
  Package,
  Truck,
  Shield,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  Star,
  Zap,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const mainServices = [
    {
      id: 1,
      title: "Graphic Digitizing",
      description:
        "Transform your vision into reality with our bespoke embroidery services",
      icon: Scissors,
      features: [
        "Any design, any size",
        "Multiple fabric types",
        "Color matching",
        "Digital mockups",
      ],
      price: "From $25",
      turnaround: "5-7 days",
      image: "/images/mainServices1.jpeg",
      color: "#D4AF37",
    },
    {
      id: 2,
      title: "Logo Digitizing",
      description:
        "Professional conversion of your logo to embroidery-ready format",
      icon: Palette,
      features: [
        "High-quality digitizing",
        "Unlimited revisions",
        "Multiple formats",
        "Fast delivery",
      ],
      price: "From $15",
      turnaround: "24-48 hours",
      image: "/images/mainServices2.jpeg",
      color: "#E8D7B5",
    },
    {
      id: 3,
      title: "Bulk Orders",
      description:
        "Special pricing for large quantity orders and corporate needs",
      icon: Package,
      features: [
        "Volume discounts",
        "Dedicated manager",
        "Priority production",
        "Quality guarantee",
      ],
      price: "Custom Quote",
      turnaround: "7-14 days",
      image: "/images/mainServices3.jpeg",
      color: "#CD853F",
    },
    {
      id: 4,
      title: "Rush Services",
      description:
        "Need it fast? We offer expedited production for urgent projects",
      icon: Zap,
      features: [
        "24-hour rush available",
        "Priority queue",
        "Same-day digitizing",
        "Express shipping",
      ],
      price: "+50% fee",
      turnaround: "1-3 days",
      image: "/images/mainServices4.jpeg",
      color: "#DAA520",
    },
  ];

  const additionalServices = [
    {
      icon: Truck,
      title: "Worldwide Shipping",
      description:
        "Fast, reliable delivery to your doorstep anywhere in the world",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "100% satisfaction guarantee on all embroidery work or your money back",
    },
    {
      icon: Users,
      title: "Design Consultation",
      description:
        "Free expert advice to help you create the perfect embroidered product",
    },
    {
      icon: Heart,
      title: "Sample Service",
      description: "Order samples before committing to larger quantities",
    },
  ];

  const process = [
    {
      step: 1,
      title: "Submit Your Design",
      description: "Upload your artwork or logo through our easy online form",
      icon: Palette,
    },
    {
      step: 2,
      title: "Get a Quote",
      description:
        "Receive a detailed quote within 24 hours with pricing and timeline",
      icon: MessageCircle,
    },
    {
      step: 3,
      title: "Approve & Produce",
      description:
        "Review your digital mockup and we start production once approved",
      icon: CheckCircle,
    },
    {
      step: 4,
      title: "Receive & Enjoy",
      description:
        "Your custom embroidered items arrive ready to wear or display",
      icon: Package,
    },
  ];

  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "We accept all common formats including JPG, PNG, PDF, AI, EPS, and SVG. If you have a different format, contact us and we'll work with you.",
    },
    {
      q: "What is your minimum order quantity?",
      a: "We have no minimum order! Whether you need 1 patch or 1,000, we can help. Bulk discounts apply for orders over 50 units.",
    },
    {
      q: "How long does production take?",
      a: "Standard orders take 5-7 business days. Rush services are available for 1-3 day turnaround at an additional 50% fee.",
    },
    {
      q: "Can I see a sample before production?",
      a: "Yes! We provide digital mockups for all orders. Physical samples are available for an additional fee that can be credited toward your final order.",
    },
    {
      q: "Do you ship internationally?",
      a: "Absolutely! We ship worldwide. International shipping times vary by location, typically 7-14 business days.",
    },
    {
      q: "What if I'm not satisfied with my order?",
      a: "We stand behind our work with a 100% satisfaction guarantee. If there's an issue with your order, we'll remake it or provide a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#101010]">
      <title>
        Services | Professional Embroidery Services | Custom Patches &
        Digitizing
      </title>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b0b0f] via-[#111113] to-[#0b0b0f] border-b border-yellow-500/20">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827]/40 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Professional Services
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight">
              Embroidery Services
              <span className="block text-yellow-500 mt-2">Made Simple</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From custom patches to bulk orders, we bring your designs to life
              with precision and care
            </p>

            {/* Button */}
            <Link
              to="/quote"
              className="inline-flex items-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20 mt-8"
            >
              Get A Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
            Our Core Services
          </h2>
          <p className="text-[#D4AF37]/80 text-lg max-w-2xl mx-auto">
            Professional embroidery solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className="group relative overflow-hidden rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`,
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} embroidery service`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent"></div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-[#D4AF37]/50">
                    <Icon className="w-7 h-7 text-[#101010]" strokeWidth={2} />
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#101010]/90 backdrop-blur-sm text-[#D4AF37] px-4 py-2 rounded-lg font-bold border border-[#D4AF37]/30">
                    {service.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#E8D7B5] group-hover:text-[#D4AF37] transition-colors duration-300 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#D4AF37]/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[#E8D7B5] text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                    <div className="flex items-center gap-2 text-[#D4AF37]/80 text-sm">
                      <Clock className="w-4 h-4" />
                      {service.turnaround}
                    </div>
                    <button className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-[#1A1A1A] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
              Additional Services
            </h2>
            <p className="text-[#D4AF37]/80 text-lg">
              Everything you need for a seamless experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-6 rounded-xl bg-[#101010] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 transform hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    <Icon
                      className="w-8 h-8 text-[#D4AF37]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#E8D7B5] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
            How It Works
          </h2>
          <p className="text-[#D4AF37]/80 text-lg">
            Simple process from concept to completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`,
                }}
              >
                {/* Connector Line */}
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent -z-10"></div>
                )}

                <div className="text-center space-y-4">
                  {/* Step Number & Icon */}
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#E8D7B5] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 transform hover:scale-110 transition-transform duration-300">
                      <Icon
                        className="w-10 h-10 text-[#101010]"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#101010] font-bold text-sm shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#E8D7B5]">
                    {step.title}
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1A1A1A] border-y border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
              Frequently Asked Questions
            </h2>
            <p className="text-[#D4AF37]/80 text-lg">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#D4AF37]/20 rounded-lg overflow-hidden bg-[#101010] hover:border-[#D4AF37] transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#D4AF37]/5 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-[#E8D7B5] pr-4">
                    {faq.q}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center transform transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] rotate-90" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === idx ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-[#D4AF37]/80 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#101010] border border-[#D4AF37]/30 p-12 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>

          <div className="relative space-y-6">
            <Star className="w-12 h-12 text-[#D4AF37] mx-auto animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
              Ready to Start Your Project?
            </h2>
            <p className="text-[#D4AF37]/80 text-lg max-w-2xl mx-auto">
              Get a free quote today and let's bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/quote"
                className="bg-[#D4AF37] text-[#101010] px-8 py-4 mx-4 rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/30"
              >
                Get Free Quote
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
