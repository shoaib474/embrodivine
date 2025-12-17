import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | StitchPro - Professional Embroidery Digitizing</title>
        <meta
          name="description"
          content="Get in touch with StitchPro for professional embroidery digitizing services. Fill out the contact form or reach us via email or phone."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFF4E6] via-[#FFF4E6] to-[#D8A657]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#78866B] mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-[#78866B]/80 max-w-2xl mx-auto"
          >
            Have questions or want a custom embroidery digitizing quote? Reach out to us using the form below or contact us directly.
          </motion.p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 rounded-xl bg-[#FFF4E6] hover:shadow-lg transition-shadow">
            <Mail className="w-10 h-10 text-[#D8A657] mb-4" />
            <h3 className="text-xl font-bold text-[#78866B] mb-2">Email</h3>
            <p className="text-[#78866B]/80">info@stitchpro.com</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-xl bg-[#FFF4E6] hover:shadow-lg transition-shadow">
            <Phone className="w-10 h-10 text-[#D8A657] mb-4" />
            <h3 className="text-xl font-bold text-[#78866B] mb-2">Phone</h3>
            <p className="text-[#78866B]/80">+123 456 7890</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-xl bg-[#FFF4E6] hover:shadow-lg transition-shadow">
            <MapPin className="w-10 h-10 text-[#D8A657] mb-4" />
            <h3 className="text-xl font-bold text-[#78866B] mb-2">Address</h3>
            <p className="text-[#78866B]/80">123 Embroidery Lane, City, Country</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gradient-to-br from-[#78866B]/5 to-[#D8A657]/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#78866B] mb-8"
          >
            Send Us a Message
          </motion.h2>
          <form className="grid grid-cols-1 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-3 rounded-lg border border-[#78866B]/30 focus:outline-none focus:ring-2 focus:ring-[#D8A657]"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-3 rounded-lg border border-[#78866B]/30 focus:outline-none focus:ring-2 focus:ring-[#D8A657]"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-6 py-3 rounded-lg border border-[#78866B]/30 focus:outline-none focus:ring-2 focus:ring-[#D8A657]"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-6 py-3 rounded-lg border border-[#78866B]/30 focus:outline-none focus:ring-2 focus:ring-[#D8A657]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Optional Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!..." // replace with your map link
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="StitchPro Location"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
