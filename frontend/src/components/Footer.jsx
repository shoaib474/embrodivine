import { Link } from "react-router-dom";
import { Scissors, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#78866B] text-[#FFF4E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="w-8 h-8 text-[#FFF4E6]" />
              <span className="text-2xl font-bold" style={{ color: "#FFF4E6" }}>StitchPro</span>
            </div>
            <p className="text-[#FFF4E6]/80">
              Professional embroidery digitizing services for businesses and individuals worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#FFF4E6" }}>Quick Links</h3>
            <div className="space-y-2">
              <Link to="/services" className="block hover:text-[#D8A657] transition-colors">Services</Link>
              <Link to="/portfolio" className="block hover:text-[#D8A657] transition-colors">Portfolio</Link>
              <Link to="/contact" className="block hover:text-[#D8A657] transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#FFF4E6" }}>Get in Touch</h3>
            <div className="space-y-3">
              <a href="mailto:info@stitchpro.com" className="flex items-center space-x-2 hover:text-[#D8A657] transition-colors">
                <Mail size={18} />
                <span>info@stitchpro.com</span>
              </a>
              <a href="https://wa.me/1234567890" className="flex items-center space-x-2 hover:text-[#D8A657] transition-colors">
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFF4E6]/20 pt-6 text-center text-[#FFF4E6]/60">
          <p>&copy; {new Date().getFullYear()} StitchPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
