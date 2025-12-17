import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Scissors, Search, User, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/new", label: "New" },
    { to: "/newcollection", label: "Design Category" },
    { to: "/alldesign", label: "All Design" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FFF4E6] shadow-lg" : "bg-[#FFF4E6]/95"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo with hover effect */}
          <Link
            to="/"
            className="flex items-center space-x-2 group hover:scale-105 transform transition-transform"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#78866B] to-[#D8A657] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6 text-[#FFF4E6]" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-[#78866B]">
              StitchPro
            </span>
          </Link>

          {/* Centered navigation links (desktop) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-[#D8A657] transition-colors font-medium relative group ${
                  location.pathname === link.to
                    ? "text-[#D8A657]"
                    : "text-[#78866B]"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D8A657] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right-side icons (desktop) with hover effects */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all">
              <Search className="text-[#78866B] w-5 h-5" />
            </button>
            <Link
              to="/auth"
              className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all"
            >
              <User className="text-[#78866B] w-5 h-5" />
            </Link>
            <Link
              to="/store"
              className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all"
            >
              <ShoppingCart className="text-[#78866B] w-5 h-5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#78866B] hover:text-[#D8A657] transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFF4E6] border-t border-[#78866B]/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-2 hover:text-[#D8A657] transition-colors font-medium ${
                    location.pathname === link.to
                      ? "text-[#D8A657]"
                      : "text-[#78866B]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex space-x-4 mt-4 justify-center">
                <button className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all">
                  <Search className="text-[#78866B] w-5 h-5" />
                </button>
                <Link
                  to="/auth"
                  className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all"
                >
                  <User className="text-[#78866B] w-5 h-5" />
                </Link>
                <Link
                  to="/store"
                  className="p-2 rounded-full hover:bg-[#FFF4E6]/20 hover:scale-110 transform transition-all"
                >
                  <ShoppingCart className="text-[#78866B] w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
