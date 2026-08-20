import React, { useState, useMemo, useRef, useCallback } from "react";
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
import StoreCTA from "../sections/store/StoreCTA";
import StoreHero from "../sections/store/StoreHero";

const Store = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const count = useCartCount();
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useProducts();

  const observer = useRef();

  const { mutate, isPending } = useAddToCart();
  const { data: favData } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // const lastProductRef = useCallback(
  //   (node) => {
  //     if (isFetchingNextPage) return;

  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [isFetchingNextPage, hasNextPage, fetchNextPage],
  // );

  // const products = data?.pages?.flatMap((page) => page.products) || [];

  const products = data?.products || [];

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
      acc[p.category?.name] = (acc[p.category?.name] || 0) + 1;
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
        selectedCategory === "all" || p.category?.name === selectedCategory;

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
    <div className="bg-[#ffffff] min-h-screen">
      <title>Shop | Premium Embroidered Patches | Embroidery Store</title>

      <StoreHero />

      {/* Sticky Header */}
      <section className="border-t border-gray-200 backdrop-blur-lg pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2  bg-[#ffffff] border border-gray-300 rounded-lg text-[#222222] placeholder:text-[#333333]/50 focus:outline-none focus:border-[#007BFF] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Cart Summary Bar */}
      {!isLoading && count > 0 && (
        <div className="sticky top-[68px] md:top-20 z-40 bg-[#007BFF] text-white py-2 px-4 animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-semibold">
            <span>🛒 {count} items in cart</span>
            <span>Total: ${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 max-w-[90%] mx-auto pt-6 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-2  bg-[#ffffff] text-[#007BFF] border border-[#007BFF]/30 rounded-lg hover:bg-[#007BFF]/10 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <p className="text-[#333333]">
          <span className="font-bold text-[#007BFF]">
            {filteredProducts.length}
          </span>{" "}
          Products
        </p>
      </div>

      <div className="bg-[#F5F7FA]">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8 py-8 ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden"
              } lg:block`}
            >
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-[#ffffff] rounded-xl p-6 border border-[#007BFF]/20">
                  <h3 className="text-lg font-bold text-[#222222] mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#007BFF]" />
                    Categories
                  </h3>
                  <div className="relative">
                    <div className="space-y-2 max-h-[390px] overflow-y-auto pr-2 hide-scrollbar">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => {
                            setSelectedCategory(cat.value);

                            if (window.innerWidth < 1024) {
                              setShowFilters(false);
                            }
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg flex justify-between transition ${
                            selectedCategory === cat.value
                              ? "bg-[#007BFF] text-white"
                              : "text-[#007BFF] hover:bg-[#007BFF]/10"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className="text-xs">{cat.count}</span>
                        </button>
                      ))}
                    </div>

                    {/* 1-line scroll indicator */}
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#007BFF] to-transparent" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="hidden md:flex items-center gap-4 ">
                  <p className="text-[#333333]">
                    <span className="font-bold text-[#007BFF]">
                      {filteredProducts.length}
                    </span>{" "}
                    Products
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#ffffff] border border-[#007BFF]/30 rounded-lg text-[#333333] focus:outline-none focus:border-[#007BFF] transition-colors"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2 bg-[#ffffff] rounded-lg border border-[#007BFF]/30 p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "grid"
                          ? "bg-[#007BFF] text-white"
                          : "text-[#007BFF]"
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "list"
                          ? "bg-[#007BFF] text-white"
                          : "text-[#007BFF]"
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
                  {filteredProducts.map((product, idx) => {
                    return (
                      <article
                        key={product._id}
                        onClick={() => handleView(product._id)}
                        className={`group bg-[#ffffff] rounded-xl overflow-hidden border border-[#007BFF]/20 hover:border-[#007BFF] transition-all duration-500 hover:shadow-2xl hover:shadow-[#007BFF]/20 cursor-pointer ${
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
                            src={product.image?.url}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                          {/* Badges */}
                          {product.badge && (
                            <div
                              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                product.badge.toLowerCase() === "hot seller"
                                  ? "bg-[#007BFF] text-white"
                                  : product.badge.toLowerCase() === "popular"
                                    ? "bg-[#FF6347] text-white"
                                    : product.badge.toLowerCase() ===
                                        "top rated"
                                      ? "bg-[#4169E1] text-white"
                                      : product.badge.toLowerCase() ===
                                          "premium"
                                        ? "bg-[#800080] text-white"
                                        : "bg-gray-500 text-white"
                              }`}
                            >
                              {product.badge}
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Favorite */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(product._id);
                              }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${
                                favorites.includes(product._id)
                                  ? "bg-[#007BFF]/20 border-[#007BFF]"
                                  : "bg-[#222222]/90 border-[#007BFF]/30 hover:bg-[#007BFF]/20"
                              }`}
                            >
                              <Heart
                                className={`w-5 h-5 transition-colors ${
                                  favorites.includes(product._id)
                                    ? "text-[#007BFF]"
                                    : "text-white/70 hover:text-[#007BFF]"
                                }`}
                                fill={
                                  favorites.includes(product._id)
                                    ? "#007BFF"
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
                              className="w-10 h-10 bg-[#222222]/90 backdrop-blur-sm border border-[#007BFF]/30 rounded-full flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF]/20 transition-all"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col bg-[#ffffff]">
                          <div className="flex-1">
                            <h3 className="text-[#222222] font-bold text-lg mt-1 group-hover:text-[#333333] transition-colors line-clamp-2">
                              {product.name}
                            </h3>

                            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                              {product?.category?.name}
                            </span>

                            <div className="flex items-center justify-between gap-2 py-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating || 0)
                                        ? "text-[#ff9d00] fill-current"
                                        : "text-[#ff9d00]/30"
                                    }`}
                                  />
                                ))}
                              </div>

                              <span className="text-gray-400 text-sm">
                                ({product.rating || 0})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#007BFF]/20">
                            <span className="text-2xl font-bold text-[#222222]">
                              ${product.price}
                            </span>

                            {user && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();

                                  if (!isProductInCart(product._id)) {
                                    mutate({
                                      productId: product._id,
                                      qty: 1,
                                    });
                                  }
                                }}
                                disabled={
                                  isPending || isProductInCart(product._id)
                                }
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                                  isProductInCart(product._id)
                                    ? "bg-green-600 text-white cursor-not-allowed"
                                    : "bg-[#007BFF] text-white hover:bg-[#0066CC] cursor-pointer"
                                }`}
                              >
                                <ShoppingCart className="w-4 h-4" />
                                {isProductInCart(product._id)
                                  ? "In Cart"
                                  : "Add"}
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <X className="w-16 h-16 text-[#007BFF] mx-auto mb-4 opacity-50" />
                  <p className="text-[#333333] text-xl font-semibold">
                    No products found
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      {/* {isFetchingNextPage && (
        <div className="text-center py-6 text-gray-400">more loading...</div>
      )}

      {!hasNextPage && products.length > 0 && (
        <div className="text-center py-6 text-red-400">
          No more products available
        </div>
      )} */}

      <StoreCTA />
    </div>
  );
};

export default Store;
