import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, Sparkles, Award, CheckCircle, Zap } from "lucide-react";

const services = [
  {
    title: "Logo Digitizing",
    description:
      "Transform your brand logo into high-quality embroidery-ready files with precise stitch details.",
    icon: <Scissors className="w-8 h-8 text-[#FFF4E6]" />,
  },
  {
    title: "Cap Digitizing",
    description:
      "Optimized for curved surfaces, ensuring flawless stitching on hats and headwear.",
    icon: <Sparkles className="w-8 h-8 text-[#FFF4E6]" />,
  },
  {
    title: "3D Puff Embroidery",
    description:
      "Raised embroidery designs adding dimension and premium quality to your projects.",
    icon: <Award className="w-8 h-8 text-[#FFF4E6]" />,
  },
  {
    title: "Patch Digitizing",
    description:
      "Custom patches for jackets, uniforms, and accessories with perfect edge stitching.",
    icon: <CheckCircle className="w-8 h-8 text-[#FFF4E6]" />,
  },
  {
    title: "Custom Digitizing",
    description:
      "Unique designs like portraits or intricate artwork expertly digitized for machines.",
    icon: <Zap className="w-8 h-8 text-[#FFF4E6]" />,
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
    description: "We convert it to stitch-perfect files",
  },
  {
    number: "03",
    title: "Delivery",
    description: "Receive machine-ready files within 24 hours",
  },
];

const testimonials = [
  {
    name: "John Doe",
    role: "Business Owner",
    feedback:
      "StitchPro delivered high-quality embroidery files quickly and accurately. Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "Designer",
    feedback:
      "The digitizing quality is unmatched. Their team is responsive and professional.",
  },
];

const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "We accept AI, EPS, PNG, JPEG, PDF, and other common design formats.",
  },
  {
    question: "How fast is your turnaround time?",
    answer: "Most projects are completed within 24 hours.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes! We provide unlimited revisions until you are completely satisfied.",
  },
];

const DesignPage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Complete Embroidery Digitizing Services | StitchPro</title>
        <meta
          name="description"
          content="Professional embroidery digitizing services including logos, caps, patches, 3D puff, and custom designs. Fast, high-quality machine-ready files."
        />
        <meta
          name="keywords"
          content="Embroidery Digitizing, Logo Digitizing, Cap Digitizing, 3D Puff, Patch Digitizing, Custom Digitizing, Machine-Ready Files"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#78866B] to-[#D8A657] text-[#FFF4E6] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Complete Embroidery Digitizing Services
          </h1>
          <p className="text-xl sm:text-2xl mb-6">
            Transform your designs into flawless, machine-ready embroidery files with expert precision.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#78866B] mb-12">
            Our Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FFF4E6] p-8 rounded-2xl border-2 border-dashed border-[#D8A657]/30 hover:border-[#D8A657] shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D8A657] to-[#B7410E] rounded-full flex items-center justify-center text-[#FFF4E6] mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#78866B] mb-4">{service.title}</h3>
                <p className="text-[#78866B]/70 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-[#78866B]/5 to-[#D8A657]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#78866B] mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D8A657] to-[#B7410E] rounded-full flex items-center justify-center text-[#FFF4E6] text-2xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-[#78866B] mb-2">{step.title}</h3>
                <p className="text-[#78866B]/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#78866B] mb-12">Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FFF4E6] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#78866B] mb-4">Fast Turnaround</h3>
              <p className="text-[#78866B]/70">Receive machine-ready files within 24 hours.</p>
            </div>
            <div className="bg-[#FFF4E6] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#78866B] mb-4">Quality Guarantee</h3>
              <p className="text-[#78866B]/70">Unlimited revisions until satisfied.</p>
            </div>
            <div className="bg-[#FFF4E6] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#78866B] mb-4">Affordable Pricing</h3>
              <p className="text-[#78866B]/70">Competitive rates for professional digitizing services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#78866B]/5 to-[#D8A657]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#78866B] mb-12">What Our Clients Say</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-[#78866B]/70 mb-4">"{test.feedback}"</p>
                <h4 className="text-[#78866B] font-bold">{test.name}</h4>
                <span className="text-[#78866B]/70">{test.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#78866B] mb-12">FAQs</h2>
          <div className="space-y-6 max-w-3xl mx-auto text-left">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-l-4 border-[#D8A657] pl-4">
                <h3 className="text-xl font-bold text-[#78866B] mb-2">{faq.question}</h3>
                <p className="text-[#78866B]/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#78866B] to-[#D8A657] text-[#FFF4E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-[#FFF4E6]/90">Request a free quote and get your project started today.</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-[#78866B] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
};

export default DesignPage;
