import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Scissors,
  User,
  ShoppingCart,
  LogOut,
  ChevronDown,
  Smile,
  Grid,
  Star,
  PawPrint,
  Layers,
} from "lucide-react";

import { useCartCount } from "../../hooks/useCartCount";

const Navbar = () => {
  const { user, logout } = useAuth();
  const count = useCartCount();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileCategoryOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/store", label: "Store" },
    { type: "category", label: "Category" },
    { to: "/quote", label: "Get A Quote!" },
    { to: "/contact", label: "Contact" },
  ];

  const categories = [
    {
      title: "General",
      subtitle: "All Designs & Styles",
      icon: Layers,
      slug: "general",
    },
    {
      title: "Anime",
      subtitle: "Characters & Scenes",
      icon: Star, // you can replace Star with any suitable icon
      slug: "anime",
    },
    {
      title: "Cartoon",
      subtitle: "Kids & Fun Designs",
      icon: Smile,
      slug: "cartoon",
    },
    {
      title: "Animal",
      subtitle: "Wild & Pet Designs",
      icon: PawPrint,
      slug: "animal",
      count: "150+ Designs",
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#212121]/95 shadow-lg" : ""
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <Scissors className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">
              Embrodivine
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            {navLinks.map((link, i) =>
              link.type === "category" ? (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => setCategoryOpen(false)}
                >
                  <button className="flex items-center gap-1 text-[#E8D7B5] hover:text-[#D4AF37] font-medium">
                    Category
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        categoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {categoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-[#101010]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4"
                      >
                        <p className="text-xs text-[#E8D7B5]/60 uppercase mb-3">
                          Categories
                        </p>

                        <div className="space-y-2">
                          <Link
                            to="/collection"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition group"
                          >
                            <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                              <Grid className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div>
                              <p className="text-[#E8D7B5] group-hover:text-[#D4AF37] font-medium">
                                New Collection
                              </p>
                              <p className="text-xs text-[#E8D7B5]/50">
                                Our New Collections
                              </p>
                            </div>
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              to={`/category/${cat.slug}`}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition group"
                            >
                              <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                                <cat.icon className="w-5 h-5 text-[#D4AF37]" />
                              </div>
                              <div>
                                <p className="text-[#E8D7B5] group-hover:text-[#D4AF37] font-medium">
                                  {cat.title}
                                </p>
                                <p className="text-xs text-[#E8D7B5]/50">
                                  {cat.subtitle}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <Link
                          to="/category"
                          className="block mt-4 text-center text-sm text-[#D4AF37] hover:underline"
                        >
                          View All →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition ${
                    location.pathname === link.to
                      ? "text-[#D4AF37]"
                      : "text-[#E8D7B5] hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <Link to="/auth">
                <User className="w-5 h-5 text-[#E8D7B5]" />
              </Link>
            ) : (
              <>
                <Link to="/dashboard" className="text-[#D4AF37] font-medium">
                  Dashboard
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#E8D7B5]" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4AF37] text-black text-xs rounded-full flex items-center justify-center">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </Link>
                <button onClick={handleLogout}>
                  <LogOut className="w-5 h-5 text-red-500 cursor-pointer" />
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex md:hidden items-center gap-4">
              {!user ? (
                <Link to="/auth">
                  <User className="w-5 h-5 text-[#E8D7B5]" />
                </Link>
              ) : (
                <>
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="w-5 h-5 text-[#E8D7B5]" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4AF37] text-black text-xs rounded-full flex items-center justify-center">
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </Link>
                  <button onClick={handleLogout}>
                    <LogOut className="w-5 h-5 text-red-500" />
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" text-[#E8D7B5]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link, i) =>
                link.type === "category" ? (
                  <div key={i}>
                    <button
                      onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                      className="flex text-center m-auto items-center justify-center gap-2 w-full text-[#E8D7B5]"
                    >
                      Category
                      <ChevronDown
                        size={16}
                        className={`transition ${
                          mobileCategoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileCategoryOpen && (
                      <div className="pl-4 mt-2 space-y-1 bg-[#101010]/95 py-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            to={`/category/${cat.slug}`}
                            className="block text-center py-1 text-[#E8D7B5] hover:text-[#D4AF37] "
                          >
                            {cat.title}
                          </Link>
                        ))}
                        <Link
                          to="/category"
                          className="block mt-4 text-center text-sm text-[#D4AF37] hover:underline"
                        >
                          View All →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-center py-2 text-[#E8D7B5] hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link
                to="/dashboard"
                className="bg-[#D4AF37] text-white flex justify-center items-center font-bold border-2 py-3 rounded-2xl"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
