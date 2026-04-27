import { Link } from "react-router-dom";
import { Scissors, Mail, MessageCircle, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#E8D7B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <img src="/logo.png" alt="logo" />
            </div>
              <span className="text-2xl font-bold text-white">Embrodivine</span>
            </div>
            <p className="text-[#E8D7B5]/80">
              Professional embroidery digitizing services for businesses and
              individuals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
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
                Services
              </Link>
              <Link
                to="/store"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Store
              </Link>
              <Link
                to="/colection"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Collection
              </Link>
              <Link
                to="/category"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Category
              </Link>
              <Link
                to="/quote"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Get A Quote! 
              </Link>
              <Link
                to="/contact"
                className="block hover:text-[#D4AF37] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Get in Touch</h3>
            <div className="space-y-3">
              <Link
                to="mailto:eeembroideryhub@gmail.com"
                className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
              >
                <Mail size={18} />
                <span>eembroideryhub@gmail.com</span>
              </Link>
              {/* <Link
                to="https://wa.me/1234567890"
                className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Footer bottom */}

        <div className="border-t border-[#D4AF37]/20 pt-6 text-center text-[#E8D7B5]/60">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Award className="w-8 h-8" style={{ color: "#D4AF37" }} />
              <div>
                <span
                  className="text-2xl font-bold tracking-tighter"
                  style={{ color: "#FFFFFF" }}
                >
                  Embrodivine
                </span>
                <div
                  className="h-0.5 mt-1"
                  style={{ backgroundColor: "#D4AF37" }}
                ></div>
              </div>
            </div>
            <p
              className="font-light text-sm tracking-wider"
              style={{ color: "#E8D7B5" }}
            >
              &copy; {new Date().getFullYear()} Embrodivine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
