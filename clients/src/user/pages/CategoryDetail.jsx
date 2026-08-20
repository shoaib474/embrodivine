import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Grid3X3,
  List,
  ShoppingCart,
  Eye,
  Star,
  ArrowLeft,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import { useCategoryWithProducts } from "../../hooks/useCategory";

import DetailSkeleton from "../components/DetailSkeleton";
import SkeletonRow from "../components/SkeletonRow";

import CategoryDetailCard from "../sections/category_detail/CategoryDetailCard";
import CategoryDetailRow from "../sections/category_detail/CategoryDetailRow";
import CategoryDetailHeader from "../sections/category_detail/CategoryDetailHeader";

const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  const { data, isLoading, isError } = useCategoryWithProducts(slug);

  const category = data?.category;
  const rawProducts = data?.products || [];

  // ── Filter ──
  const filtered = rawProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ── Sort ──
  const products = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleProductClick = (id) => navigate(`/store/${id}`);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] pt-28 pb-16">
        {/* Header skeleton */}
        <div className="border-b border-[#007BFF]/10 bg-white mb-10">
          <div className="max-w-6xl mx-auto px-4 py-10 text-center space-y-4 animate-pulse">
            <div className="h-10 bg-[#007BFF]/10 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-[#007BFF]/10 rounded w-1/2 mx-auto" />
            <div className="h-8 bg-[#007BFF]/10 rounded-full w-28 mx-auto" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DetailSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <p className="text-[#222222] font-semibold text-lg">
            Something went wrong
          </p>
          <p className="text-[#333333]/50 text-sm mt-1">
            Unable to load this category.
          </p>
          <button
            onClick={() => navigate("/categories")}
            className="mt-4 px-5 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-16">
      {/* ══════════ HEADER ══════════ */}
      <CategoryDetailHeader category={category} rawProducts={rawProducts} />

      {/* ══════════ TOOLBAR ══════════ */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white border border-[#007BFF]/20 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/50" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] transition-colors text-sm"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#007BFF]/50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-lg text-[#333333] text-sm focus:outline-none focus:border-[#007BFF] transition-colors"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex gap-1 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-lg p-1 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-[#007BFF] text-white"
                  : "text-[#007BFF]/50 hover:text-[#007BFF]"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-[#007BFF] text-white"
                  : "text-[#007BFF]/50 hover:text-[#007BFF]"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Result count */}
        <p className="text-[#007BFF]/50 text-sm mt-3 ml-1">
          {products.length === rawProducts.length
            ? `${products.length} products`
            : `${products.length} of ${rawProducts.length} products`}
        </p>
      </div>

      {/* ══════════ PRODUCTS ══════════ */}
      <div className="max-w-6xl mx-auto px-4">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-5 bg-white border border-[#007BFF]/20 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-[#007BFF]/30" />
            </div>
            <h3 className="text-xl font-semibold text-[#222222]">
              {searchQuery
                ? "No products match your search"
                : "No Products Yet"}
            </h3>
            <p className="text-[#333333]/50 text-sm mt-2">
              {searchQuery
                ? "Try a different keyword."
                : "This category has no products yet."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-5 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <CategoryDetailCard
                key={product._id}
                product={product}
                onClick={handleProductClick}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product, idx) => (
              <CategoryDetailRow
                key={product._id}
                product={product}
                onClick={handleProductClick}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
