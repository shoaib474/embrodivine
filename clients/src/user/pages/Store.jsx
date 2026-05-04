import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  SlidersHorizontal,
  Star,
  Heart,
  Eye,
  TrendingUp,
  Award,
  X,
  Grid3x3,
  List,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import ProductSkeleton from "../components/ProductSkeleton";

import { useAddToCart, useCart } from "../../hooks/useCart";
import { useCartCount } from "../../hooks/useCartCount";
import { useFavorites, useToggleFavorite } from "../../hooks/useFavorites";
import { useProducts } from "../../hooks/useProduct";

const Store = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const count = useCartCount();
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { data: productsData, isLoading, isError } = useProducts();
  const { mutate, isPending } = useAddToCart();
  const { data: favData } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const products = productsData?.products || productsData || [];
  const cart = cartData?.products || [];

  const isProductInCart = (productId) => {
    return cart?.some(
      (item) =>
        item.productId?._id === productId || item.productId === productId,
    );
  };

  const favorites = favData?.favorites?.map((f) => f.product?._id) || [];

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  const handleView = (productId) => {
    if (!productId) return; // safety check
    navigate(`/store/${productId}`); // better to have a clear path
  };

  const categories = useMemo(() => {
    const counts = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { value: "all", label: "All Products", count: products.length },
      ...Object.keys(counts).map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: counts[cat],
      })),
    ];
  }, [products]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (selectedSort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, priceRange, selectedSort]);

  const cartTotal = (cart || []).reduce(
    (sum, i) => sum + (i.productId?.price || i.price || 0) * (i.qty || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-[#101010]">
      <title>Shop | Premium Embroidered Patches | Embroidery Store</title>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b0b0f] via-[#111113] to-[#0b0b0f] border-b border-yellow-500/20">
        {/* Glow Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827]/40 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Premium Embroidery Collection
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight">
              High-Quality
              <span className="block text-yellow-500 mt-2">
                Embroidery Products
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our premium embroidery solutions designed for brands,
              businesses, and creators who demand flawless quality and precision
              craftsmanship.
            </p>

            {/* Button */}
            <Link
              to="/quote"
              className="inline-flex items-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20 mt-8"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Header */}
      <section className="border-t border-[#D4AF37]/20 backdrop-blur-lg pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Cart Summary Bar */}
      {!isLoading && count > 0 && (
        <div className="sticky top-[68px] md:top-20 z-40 bg-[#D4AF37] text-[#101010] py-2 px-4 animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-semibold">
            <span>🛒 {count} items in cart</span>
            <span>Total: ${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
                  Categories
                </h3>
                <div className="relative">
                  <div className="space-y-2 max-h-[390px] overflow-y-auto pr-2 hide-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full text-left px-4 py-2 rounded-lg flex justify-between transition ${
                          selectedCategory === cat.value
                            ? "bg-[#D4AF37] text-[#101010]"
                            : "text-[#D4AF37] hover:bg-[#D4AF37]/10"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="text-xs">{cat.count}</span>
                      </button>
                    ))}
                  </div>

                  {/* 1-line scroll indicator */}
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#E8D7B5] mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className="w-full accent-[#D4AF37]"
                  />
                  <div className="flex items-center justify-between text-sm text-[#D4AF37]">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#E8D7B5] mb-4">
                  Quick Filters
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Trending</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Bestsellers</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">New Arrivals</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/10 transition-all"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-[#E8D7B5]">
                  <span className="font-bold text-[#D4AF37]">
                    {filteredProducts.length}
                  </span>{" "}
                  Products
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/30 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-all ${
                      viewMode === "grid"
                        ? "bg-[#D4AF37] text-[#101010]"
                        : "text-[#D4AF37]"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-all ${
                      viewMode === "list"
                        ? "bg-[#D4AF37] text-[#101010]"
                        : "text-[#D4AF37]"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <X className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-50" />
                <p className="text-red-500 text-lg font-semibold">
                  {isError?.message || "Something went wrong"}
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, idx) => (
                  <article
                    key={product._id}
                    onClick={() => handleView(product._id)}
                    className={`group bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 cursor-pointer ${
                      viewMode === "grid"
                        ? "transform hover:-translate-y-2"
                        : "flex gap-4"
                    }`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.05}s both`,
                    }}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "grid"
                          ? "aspect-square"
                          : "w-32 h-32 flex-shrink-0"
                      }`}
                    >
                      <img
                        src={product.image.url}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                      {/* Badges */}
                      {product.badge && (
                        <div
                          className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold uppercase ${
                            product.badge.toLowerCase() === "hot seller"
                              ? "bg-[#D4AF37] text-[#101010]"
                              : product.badge.toLowerCase() === "popular"
                                ? "bg-[#FF6347] text-white"
                                : product.badge.toLowerCase() === "top rated"
                                  ? "bg-[#4169E1] text-white"
                                  : product.badge.toLowerCase() === "premium"
                                    ? "bg-[#800080] text-white"
                                    : "bg-gray-500 text-white" // default
                          }`}
                        >
                          {product.badge}
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Favorite */}

                        <button
                          onClick={() => handleToggleFavorite(product._id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${
                            favorites.includes(product._id)
                              ? "bg-[#D4AF37]/20 border-[#D4AF37]"
                              : "bg-[#101010]/90 border-[#D4AF37]/30 hover:bg-[#D4AF37]/20"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              favorites.includes(product._id)
                                ? "text-[#D4AF37]"
                                : "text-white/70 hover:text-[#D4AF37]"
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
                          onClick={() => handleView(product._id)}
                          className="w-10 h-10 bg-[#101010]/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
                          {product.category}
                        </span>
                        <h3 className="text-[#E8D7B5] font-bold text-lg mt-1 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 py-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-[#D4AF37] fill-current"
                                    : "text-[#D4AF37]/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[#D4AF37]/70 text-sm">
                            ({product.rating})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#D4AF37]/20">
                        <span className="text-2xl font-bold text-[#D4AF37]">
                          ${product.price}
                        </span>
                        {user && (
                          <button
                            onClick={() => {
                              if (!isProductInCart(product._id)) {
                                mutate({ productId: product._id, qty: 1 });
                              }
                            }}
                            disabled={isPending || isProductInCart(product._id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                              isProductInCart(product._id)
                                ? "bg-green-600 text-white cursor-not-allowed"
                                : "bg-[#D4AF37] text-[#101010] hover:bg-[#E8D7B5] cursor-pointer shadow-lg shadow-[#D4AF37]/30"
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {isProductInCart(product._id) ? "In Cart" : "Add"}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <X className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-50" />
                <p className="text-[#E8D7B5] text-xl font-semibold">
                  No products found
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <section
        className="py-32 px-4 flex flex-col items-center text-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mb-6">
          <span
            className="text-sm tracking-widest font-light"
            style={{ color: "#D4AF37" }}
          >
            JOIN THE EXCLUSIVE CIRCLE
          </span>
        </div>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "#FFFFFF" }}
        >
          Experience Luxury Embroidery
          <br />
          <span style={{ color: "#D4AF37" }}>Tailored Just For You</span>
        </h2>
        <p
          className="text-lg md:text-xl mb-12 max-w-2xl font-light"
          style={{ color: "#E8D7B5" }}
        >
          Subscribe to our newsletter and be the first to discover exclusive
          collections and bespoke designs.
        </p>

        {/* Email Input + Button */}
        <div className="flex flex-col px-4 sm:flex-row gap-4 w-full md:max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your Email Address"
            className="px-6 py-4 w-full sm:flex-1 focus:outline-none border font-light"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderColor: "#D4AF37",
            }}
          />
          <button
            className="px-8 py-4 font-semibold tracking-widest text-sm transform hover:scale-105 transition-all border hover:bg-white hover:text-black"
            style={{
              backgroundColor: "#D4AF37",
              color: "#000000",
              borderColor: "#D4AF37",
            }}
          >
            GET EXCLUSIVE ACCESS
          </button>
        </div>
      </section>
    </div>
  );
};

export default Store;
