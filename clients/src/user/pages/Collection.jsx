import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Star,
  Heart,
  Package,
  Flower2,
  Car,
  Shield,
  BadgeCheck,
  Baby,
  Quote,
  Type,
  Plane,
  Music,
  Gamepad2,
  Anchor,
  Palette,
  Target,
} from "lucide-react";

const Collections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      title: "Animals & Pets",
      subtitle: "Cute Creations",
      icon: Heart,
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=400&fit=crop",
      count: "150+ Designs",
    },
    {
      id: 2,
      title: "Floral & Nature",
      subtitle: "Beautiful Blooms",
      icon: Flower2,
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=400&fit=crop",
      count: "200+ Designs",
    },
    {
      id: 3,
      title: "Cartoon & Kids",
      subtitle: "Fun Designs Art",
      icon: Baby,
      image:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=400&fit=crop",
      count: "180+ Designs",
    },
    {
      id: 4,
      title: "Vehicles",
      subtitle: "Cars & Bikes",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      count: "120+ Designs",
    },
    {
      id: 5,
      title: "Logos & Badges",
      subtitle: "Emblems & Patches",
      icon: BadgeCheck,
      image:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=500&h=400&fit=crop",
      count: "95+ Designs",
    },
    {
      id: 6,
      title: "Wedding & Love",
      subtitle: "Romantic Patches",
      icon: Heart,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop",
      count: "140+ Designs",
    },
    {
      id: 7,
      title: "Military",
      subtitle: "Army & Tactical",
      icon: Shield,
      image:
        "https://images.unsplash.com/photo-1611939816549-7ee4e881b8e0?w=500&h=400&fit=crop",
      count: "85+ Designs",
    },
    {
      id: 8,
      title: "Quotes",
      subtitle: "Inspiring Words",
      icon: Quote,
      image:
        "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&h=400&fit=crop",
      count: "110+ Designs",
    },
    {
      id: 9,
      title: "Typography",
      subtitle: "Inspiring Words",
      icon: Type,
      image:
        "https://images.unsplash.com/photo-1509909756405-be0199881695?w=500&h=400&fit=crop",
      count: "75+ Designs",
    },
    {
      id: 10,
      title: "Travel & Adventure",
      subtitle: "Explore Designs",
      icon: Plane,
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop",
      count: "90+ Designs",
    },
    {
      id: 11,
      title: "Music & Arts",
      subtitle: "Creative Patches",
      icon: Music,
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=400&fit=crop",
      count: "65+ Designs",
    },
    {
      id: 12,
      title: "Sports & Games",
      subtitle: "Athletic Designs",
      icon: Gamepad2,
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=400&fit=crop",
      count: "130+ Designs",
    },
  ];

  const quickFilters = [
    { icon: Search, label: "Search" },
    { icon: TrendingUp, label: "Top Rated" },
    { icon: ShoppingBag, label: "Bestsellers" },
    { icon: Sparkles, label: "New Arrivals" },
    { icon: Target, label: "Under $5" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#101010] relative overflow-hidden pt-16">
      <title>Embroidery Collections | Custom & Ready-Made Designs</title>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="text-[#D4AF37]">
          <path
            d="M 10,10 Q 10,100 100,100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 20,20 Q 20,90 90,90"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="15" cy="15" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" className="text-[#D4AF37]">
          <path
            d="M 10,10 Q 10,100 100,100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 20,20 Q 20,90 90,90"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="15" cy="15" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Background Bokeh Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-40 right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Decorative Line Above Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#E8D7B5] to-[#D4AF37] bg-clip-text text-transparent"
            style={{ fontFamily: "Georgia, serif" }}
          >
            All Embroidery Collections
          </h1>

          {/* Decorative Underline */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30"></div>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>

          <p className="text-[#D4AF37]/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Machine embroidery designs for every style - instant download,
            premium quality
          </p>

          {/* Browse Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-[#101010] rounded-lg font-bold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all text-lg"
          >
            Browse by Category
          </motion.button>
        </motion.div>

        {/* Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {quickFilters.map((filter, index) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{filter.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                className="group relative bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-xl overflow-hidden cursor-pointer hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
              >
                {/* Decorative Corner Frame */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37]/40 pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#D4AF37]/40 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#D4AF37]/40 pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37]/40 pointer-events-none"></div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent z-10"></div>
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm mb-3">
                    {category.subtitle}
                  </p>

                  {/* View Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] text-sm font-semibold">
                      {category.count}
                    </span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg text-sm font-bold hover:bg-[#E8D7B5] transition-colors"
                    >
                      View Designs
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Popular Collections Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 mb-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#E8D7B5] font-semibold">
                Popular Collections
              </span>
            </div>
            <div className="h-6 w-px bg-[#D4AF37]/30"></div>
            <span className="text-[#D4AF37]/70">Bestseller Designs</span>
            <div className="h-6 w-px bg-[#D4AF37]/30"></div>
            <span className="text-[#D4AF37]/70">Trending This Week</span>
            <div className="h-6 w-px bg-[#D4AF37]/30"></div>
            <span className="text-[#D4AF37]/70">Customer Favorites</span>
          </div>
        </motion.div>

        {/* Formats Supported */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-[#E8D7B5] font-bold text-xl mb-4">
            Formats Supported:{" "}
            <span className="text-[#D4AF37]">
              DST • PES • JEF • EXP • VXX • SEW • ZOO
            </span>
          </h3>
        </motion.div>

        {/* Custom Design CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1A1A1A] to-[#101010] border-2 border-[#D4AF37]/30 rounded-2xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Can't find the design you want?
            </h2>
            <p className="text-[#D4AF37]/70 text-lg mb-8">
              Request a custom embroidery design
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-[#101010] rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
            >
              Request Custom Design
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Corners */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20 pointer-events-none transform scale-y-[-1]">
        <svg viewBox="0 0 200 200" className="text-[#D4AF37]">
          <path
            d="M 10,10 Q 10,100 100,100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 20,20 Q 20,90 90,90"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="15" cy="15" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 pointer-events-none transform scale-[-1]">
        <svg viewBox="0 0 200 200" className="text-[#D4AF37]">
          <path
            d="M 10,10 Q 10,100 100,100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 20,20 Q 20,90 90,90"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="15" cy="15" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default Collections;
