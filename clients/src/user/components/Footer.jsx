import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, Headphones } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.webp"
                  alt="EmbroDivine"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">EmbroDivine</h2>
                <p className="text-sm text-gray-400">
                  Premium Embroidery Designs
                </p>
              </div>
            </div>

            <p className="font-semibold text-white mb-3">
              Professional Embroidery Marketplace
            </p>

            <p className="leading-7 text-gray-400">
              High-quality machine embroidery designs for businesses, hobbyists
              and creators worldwide.
            </p>

            <div className="mt-5">
              <span className="font-semibold text-white">Hours:</span>
              <p className="text-gray-400 mt-1">
                Monday – Friday
                <br />
                8:00am – 5:00pm PST
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">Quick Links</h3>

            <div className="space-y-3">
              <Link
                to="/"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Embroidery Digitizing
              </Link>

              <Link
                to="/store"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Design Store
              </Link>

              <Link
                to="/category"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Categories
              </Link>

              <Link
                to="/quote"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Get Quote
              </Link>

              <Link
                to="/contact"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#D4AF37] mt-1" />

                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-gray-400">+1 (800) 777-4510</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#D4AF37] mt-1" />

                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-gray-400 break-all">
                    eembroideryhub@gmail.com
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium text-white mb-1">
                  International Support
                </p>
                <p className="text-gray-400">Available Worldwide</p>
              </div>
            </div>
          </div>

          {/* Sales & Support */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Headphones size={24} className="text-[#D4AF37]" />

              <h3 className="text-xl font-bold text-white">Sales & Support</h3>
            </div>

            <p className="text-3xl font-bold text-white mb-8">
              +1 (800) 777-4510
            </p>

            <div className="space-y-4">
              <Link
                to="/quote"
                className="block font-semibold hover:text-[#D4AF37] transition-colors"
              >
                Get Embroidery Quote →
              </Link>

              <Link
                to="/store"
                className="block font-semibold hover:text-[#D4AF37] transition-colors"
              >
                Browse Designs →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#D4AF37]/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/terms"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/privacy"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <p className="text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} EmbroDivine. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
