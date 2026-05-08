import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Smile,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Award,
  Zap,
  Check,
  TrendingUp,
  PawPrint,
  Flower,
  Flag,
  Type,
  Ghost,
  MapPin,
} from "lucide-react";

import { useProducts } from "../../hooks/useProduct";

import SpinnerLoader from "../components/SpinnerLoader";

const Categories = () => {
  const navigate = useNavigate();

  const categoryIcons = {
    cartoon: Smile,
    anime: Star,
    flower: Flower,
    animal: PawPrint,
    flag: Flag,
    alphabets: Type,
    halloween: Ghost,
    landmark: MapPin,
    custom: Sparkles,
    default: Sparkles,
  };

  const { data, isLoading, isError } = useProducts();

  const products = data?.pages.flatMap((page) => page.products) || [];

  const categories = useMemo(() => {
    if (!products.length) return [];

    const categoryMap = {};

    products.forEach((product) => {
      if (product.category && product.category.trim() !== "") {
        const cat = product.category.trim();

        if (!categoryMap[cat]) {
          const count = products.filter((p) => p.category === cat).length;

          categoryMap[cat] = {
            title: cat,
            subtitle: `${count}+ Designs`,
            icon: categoryIcons[cat.toLowerCase()] || categoryIcons.default,
            slug: cat.toLowerCase().replace(/\s+/g, "-"),
            count: `${count}+ Designs`,
          };
        }
      }
    });

    return Object.values(categoryMap);
  }, [products]);

  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Star, label: "5-Star Reviews", value: "2,500+" },
    { icon: Award, label: "Premium Quality", value: "100%" },
    { icon: TrendingUp, label: "Years Experience", value: "15+" },
  ];

  const features = [
    "Premium Quality Materials",
    "Custom Design Options",
    "Fast Worldwide Shipping",
    "100% Satisfaction Guarantee",
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="min-h-screen bg-[#101010] relative overflow-hidden">
      <title>Embroidery Category | Custom & Ready-Made Designs</title>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 text-sm font-semibold">
                Premium Embroidery & Patches
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Our
              <span className="block text-transparent bg-clip-text bg-yellow-500 ">
                Design Collections
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore premium embroidered patches and designs crafted with
              precision. From classic styles to custom creations, find the
              perfect piece for your project.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="group px-8 py-4 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-yellow-500/20">
                Browse Collections
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/quote"
                className="px-8 py-4 bg-[#1A1A1A] border-2 border-yellow-500/30 text-yellow-500 rounded-lg font-bold hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300"
              >
                Custom Request
              </Link>
            </motion.div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center mt-12 gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-yellow-500/50" />
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-yellow-500/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#E8D7B5] mb-1">
                  {stat.value}
                </div>
                <div className="text-yellow-500/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8D7B5] mb-4">
              Shop by Category
            </h2>
            <p className="text-yellow-500/70 text-lg max-w-2xl mx-auto">
              Choose from our carefully curated collections
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;

              return (
                <motion.div
                  key={category.slug}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative bg-[#1A1A1A]/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-yellow-500 group-hover:shadow-2xl group-hover:shadow-yellow-500/20">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-20 h-20 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/30 group-hover:bg-yellow-500/20 group-hover:border-yellow-500 transition-all duration-300"
                      >
                        <IconComponent className="w-10 h-10 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-[#E8D7B5] group-hover:text-yellow-500 transition-colors duration-300">
                        {category.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-yellow-500/70 text-sm group-hover:text-yellow-500/90 transition-colors duration-300">
                        {category.subtitle}
                      </p>

                      {/* Count Badge */}
                      <div className="px-4 py-1.5 bg-yellow-500/10 rounded-full">
                        <span className="text-yellow-500 text-xs font-semibold">
                          {category.count}
                        </span>
                      </div>

                      {/* Arrow Icon */}
                      <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-5 h-5 text-yellow-500" />
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full" />
                  </div>

                  {/* Accessibility Link */}
                  <Link
                    to={`/category/${category.slug}`}
                    className="absolute inset-0 z-20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#101010]"
                    aria-label={`Browse ${category.title} - ${category.subtitle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category.slug);
                    }}
                  >
                    <span className="sr-only">
                      {category.title} - {category.subtitle}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#101010] border border-yellow-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-4">
                  Why Choose Our Patches?
                </h3>
                <p className="text-yellow-500/70 mb-6 leading-relaxed">
                  We're committed to delivering the highest quality embroidered
                  patches with attention to every detail. Join thousands of
                  satisfied customers worldwide.
                </p>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-yellow-500" />
                      </div>
                      <span className="text-[#E8D7B5]">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right Content - Image Placeholder */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-2xl flex items-center justify-center border border-yellow-500/30">
                  <div className="text-center">
                    <Star className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                    <p className="text-[#E8D7B5] font-semibold">
                      Premium Quality
                    </p>
                    <p className="text-yellow-500/60 text-sm">
                      Crafted with Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 border border-yellow-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-4">
                Need a Custom Design?
              </h2>
              <p className="text-yellow-500/70 text-lg mb-8 max-w-2xl mx-auto">
                Can't find exactly what you're looking for? Our design team is
                ready to bring your unique vision to life with premium quality
                craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/quote"
                  className="group px-8 py-4 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                  Start Custom Order
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 rounded-lg font-bold hover:bg-yellow-500/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
