import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Smile,
  Home,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Search,
  AlertCircle,
  PawPrint,
  Eye,
  Sparkles,
  Flower,
  Flag,
  Type,
  Ghost,
  MapPin,
} from "lucide-react";

import SpinnerLoader from "../components/SpinnerLoader";

import { useAuth } from "../context/AuthContext";

import { useProducts } from "../../hooks/useProduct";
import { useAddToCart, useCart } from "../../hooks/useCart";
import { useFavorites, useToggleFavorite } from "../../hooks/useFavorites";

const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { data, isLoading, isError } = useProducts();
  const { mutate, isPending } = useAddToCart();
  const { data: favData } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const [selectedSort, setSelectedSort] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

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

  const allProducts = data?.pages.flatMap((page) => page.products) || [];
  const cart = cartData?.products || [];

  const categories = useMemo(() => {
    if (!allProducts.length) return [];

    const categoryCount = {};

    // ✅ Count categories (fast)
    allProducts.forEach((product) => {
      if (product.category && product.category.trim() !== "") {
        const cat = product.category.trim();
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      }
    });

    // ✅ Build category objects
    return Object.entries(categoryCount).map(([cat, count]) => ({
      title: cat,
      subtitle: `${count}+ Designs`,
      icon: categoryIcons[cat.toLowerCase()] || categoryIcons.default,
      slug: cat.toLowerCase().replace(/\s+/g, "-"),
      count: `${count}+ Designs`,
    }));
  }, [allProducts]);

  const isProductInCart = (productId) => {
    return cart?.some(
      (item) =>
        item.productId?._id === productId || item.productId === productId,
    );
  };

  const handleView = (productId) => {
    if (!productId) return; // safety check
    navigate(`/store/${productId}`); // better to have a clear path
  };

  const currentCategory = categories.find((cat) => cat.slug === slug);

  // Filter products by category and search
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      product.category.toLowerCase().replace(/\s+/g, "-") === slug;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favorites = favData?.favorites?.map((f) => f.product?._id) || [];

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  if (isLoading) return <SpinnerLoader />;

  // Category not found
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#E8D7B5] mb-3">
            Category Not Found
          </h1>
          <p className="text-yellow-500/70 mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/category"
            className="inline-block px-6 py-3 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all"
          >
            Browse All Categories
          </Link>
        </motion.div>
      </div>
    );
  }

  const CategoryIcon = currentCategory.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <title>Category Detail Embroidery Designs | Premium Digitizing</title>
      <div className="min-h-screen bg-[#101010] pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm"
          >
            <Link
              to="/"
              className="text-yellow-500/70 hover:text-yellow-500 transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-yellow-500/50" />
            <Link
              to="/category"
              className="text-yellow-500/70 hover:text-yellow-500 transition-colors"
            >
              Categories
            </Link>
            <ChevronRight className="w-4 h-4 text-yellow-500/50" />
            <span className="text-white font-semibold">
              {currentCategory.title}
            </span>
          </motion.div>
        </div>

        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/30"
            >
              <CategoryIcon className="w-12 h-12 text-yellow-500" />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E8D7B5] mb-4">
              {currentCategory.title}
            </h1>

            {/* Subtitle */}
            <p className="text-yellow-500/70 text-lg md:text-xl mb-6">
              {currentCategory.subtitle}
            </p>

            {/* Product Count */}
            <div className="inline-block px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/30">
              <span className="text-yellow-500 font-semibold">
                {filteredProducts.length} Products Available
              </span>
            </div>
          </motion.div>
        </div>

        {/* Filters Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500/50" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-yellow-500/30 rounded-lg text-[#E8D7B5] placeholder-yellow-500/50 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-4 py-3 bg-[#1A1A1A] border border-yellow-500/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  onClick={() => handleView(product._id)}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-[#1A1A1A] border border-yellow-500/20 rounded-xl overflow-hidden cursor-pointer hover:border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* Image */}
                    <img
                      src={product.image?.url || "/placeholder.png"}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Right Side Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      {/* Favorite */}
                      <button
                        onClick={() => handleToggleFavorite(product._id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${
                          favorites.includes(product._id)
                            ? "bg-yellow-500/20 border-yellow-500"
                            : "bg-[#101010]/90 border-yellow-500/30 hover:bg-yellow-500/20"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            favorites.includes(product._id)
                              ? "text-yellow-500"
                              : "text-white/70 hover:text-yellow-500"
                          }`}
                          fill={
                            favorites.includes(product._id)
                              ? "#D4AF37"
                              : "transparent"
                          }
                        />
                      </button>

                      {/* View */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(product._id);
                        }}
                        className="w-10 h-10 bg-[#101010]/90 backdrop-blur-sm border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-500/20 transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick Add */}
                    {user && (
                      <button
                        onClick={() => {
                          if (!isProductInCart(product._id)) {
                            mutate({ productId: product._id, qty: 1 });
                          }
                        }}
                        disabled={isPending || isProductInCart(product._id)}
                        className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-11/12 px-4 py-2 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2
                                  ${
                                    isProductInCart(product._id)
                                      ? "bg-green-600 text-white cursor-not-allowed"
                                      : "bg-yellow-500 text-[#101010] hover:bg-[#E8D7B5] cursor-pointer shadow-lg shadow-yellow-500/30"
                                  }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isProductInCart(product._id)
                          ? "In Cart"
                          : "Add To Cart"}
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-white font-semibold line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-yellow-500/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500/70 text-xs">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-white font-bold text-xl">
                        ${product.price}
                      </span>
                      <span className="text-yellow-500 text-sm">
                       Colors: {product.colors}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-[#1A1A1A] border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-yellow-500/50" />
              </div>
              <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                No products found
              </h3>
              <p className="text-yellow-500/70 mb-6">
                Try adjusting your search terms
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 bg-yellow-500 text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
