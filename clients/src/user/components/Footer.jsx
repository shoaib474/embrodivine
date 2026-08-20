import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, Headphones } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#ffffff] text-[#4B4B4B] shadow-[0_-8px_30px_rgba(0,123,255,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <img
                  src="/logo.webp"
                  alt="EmbroDivine"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  EmbroDivine
                </h2>
                <p className="text-sm text-[#777]">
                  Premium Embroidery Designs
                </p>
              </div>
            </div>

            <p className="font-semibold text-[#444] mb-3">
              Professional Embroidery Design Marketplace
            </p>

            <p className="leading-7 text-[#666]">
              High-quality machine embroidery designs for embroidery businesses,
              hobbyists and creators worldwide.
            </p>

            <div className="mt-5">
              <span className="font-semibold">Hours:</span>
              <p className="text-[#666]">
                Monday – Friday
                <br />
                8:00pm – 7:00am
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#0066CC] hover:text-white transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#0066CC] hover:text-white transition"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                to="/services"
                className="block hover:text-[#0066CC] transition"
              >
                Embroidery Digitizing
              </Link>

              <Link
                to="/store"
                className="block hover:text-[#0066CC] transition"
              >
                Design Store
              </Link>

              <Link
                to="/category"
                className="block hover:text-[#0066CC] transition"
              >
                Categories
              </Link>

              <Link
                to="/quote"
                className="block hover:text-[#0066CC] transition"
              >
                Get Quote
              </Link>

              <Link
                to="/about"
                className="block hover:text-[#0066CC] transition"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="block hover:text-[#0066CC] transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-5">
              Contact Us
            </h3>

            <div className="space-y-5">
              {/* <div className="flex gap-3">
                <Phone
                  size={18}
                  className="text-[#0066CC] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-[#666]">+1 (800) 777-4510</p>
                </div>
              </div> */}

              <div className="flex gap-3">
                <Mail size={18} className="text-[#0066CC] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-[#666]">eembroideryhub@gmail.com</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">International Support</p>
                <p className="text-[#666]">Available Worldwide</p>
              </div>
            </div>
          </div>

          {/* Support / CTA */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Headphones size={24} className="text-[#0066CC]" />
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                Sales & Support
              </h3>
            </div>

            {/* <p className="text-2xl font-bold text-[#1A1A1A] mb-8">
              +1 (800) 777-4510
            </p> */}

            <div className="space-y-4">
              <Link
                to="/quote"
                className="block font-semibold hover:text-[#0066CC] transition"
              >
                Get Embroidery Quote →
              </Link>

              <Link
                to="/store"
                className="block font-semibold hover:text-[#0066CC] transition"
              >
                Browse Designs →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#777]">
            <div className="flex gap-4">
              <Link to="/term-conditions" className="hover:text-[#0066CC]">
                Terms & Conditions
              </Link>

              <Link to="/privacy-policy" className="hover:text-[#0066CC]">
                Privacy Policy
              </Link>
            </div>

            <p>
              © {new Date().getFullYear()} EmbroDivine. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
