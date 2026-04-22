import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  ShoppingBag,
  Package,
  ArrowRight,
  Compass,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    { icon: Home, label: "Back to Home", href: "/", color: "#D4AF37" },
    {
      icon: ShoppingBag,
      label: "Shop Products",
      href: "/store",
      color: "#4169E1",
    },
    {
      icon: Package,
      label: "View Collections",
      href: "/collections",
      color: "#32CD32",
    },
    { icon: Search, label: "Search Site", href: "/search", color: "#FF6347" },
  ];

  const popularPages = [
    { name: "Custom Patches", href: "/products/patches" },
    { name: "Services", href: "/services" },
    { name: "Get a Quote", href: "/quote" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 py-30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
            transition: "all 0.3s ease-out",
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x / 15}px`,
            bottom: `${mousePosition.y / 15}px`,
            animationDelay: "1s",
            transition: "all 0.3s ease-out",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 animate-float"
          style={{ animationDelay: "0s" }}
        >
          <Sparkles className="w-8 h-8 text-[#D4AF37]/30" />
        </div>
        <div
          className="absolute top-40 right-20 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <Sparkles className="w-6 h-6 text-[#D4AF37]/20" />
        </div>
        <div
          className="absolute bottom-32 left-1/4 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Sparkles className="w-7 h-7 text-[#D4AF37]/25" />
        </div>
        <div
          className="absolute bottom-20 right-1/3 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Sparkles className="w-5 h-5 text-[#D4AF37]/30" />
        </div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Error Message */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            {/* 404 Number */}
            <div className="relative">
              <h1 className="text-[150px] sm:text-[200px] lg:text-[250px] font-bold text-[#D4AF37]/10 leading-none select-none">
                404
              </h1>
              <div className="absolute to-25% inset-0 flex items-center justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#1A1A1A] border-4 border-[#D4AF37] rounded-full flex items-center justify-center animate-pulse-slow">
                    <AlertTriangle
                      className="w-16 h-16 sm:w-20 sm:h-20 text-[#D4AF37]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4 pt-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#E8D7B5]">
                Oops! Lost in the
                <span className="block text-[#D4AF37] mt-2">Thread Maze</span>
              </h2>
              <p className="text-lg text-[#D4AF37]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Looks like this page has been stitched out of existence. The
                page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Search Box */}
            <div className="pt-4">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                <input
                  type="text"
                  placeholder="Search for products, services..."
                  className="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all">
                  Search
                </button>
              </div>
            </div>

            {/* Error Code */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-full">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37]/80 text-sm">
                  Error Code: 404 - Page Not Found
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Quick Links */}
          <div
            className="space-y-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Quick Actions */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-[#E8D7B5] mb-6">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={idx}
                      to={link.href}
                      className="group flex items-center gap-4 p-4 bg-[#101010] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/10"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${link.color}20` }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: link.color }}
                        />
                      </div>
                      <span className="text-[#E8D7B5] font-semibold group-hover:text-[#D4AF37] transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Popular Pages */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#E8D7B5] mb-4">
                Popular Pages
              </h3>
              <div className="space-y-2">
                {popularPages.map((page, idx) => (
                  <Link
                    key={idx}
                    to={page.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-[#101010] transition-all duration-300 group"
                  >
                    <span className="text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors">
                      {page.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#101010]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#E8D7B5] mb-2">
                    Need Help?
                  </h4>
                  <p className="text-[#D4AF37]/80 text-sm mb-4">
                    Can't find what you're looking for? Our team is here to help
                    you navigate.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div
          className="text-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-[#D4AF37]/60 text-sm">
            If you believe this is an error, please{" "}
            <Link
              to="/contact"
              className="text-[#D4AF37] font-semibold hover:underline"
            >
              contact us
            </Link>{" "}
            and let us know.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
