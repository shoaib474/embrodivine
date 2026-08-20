import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid3X3, List } from "lucide-react";
import { useCategories } from "../../hooks/useCategory";
import CategoryRow from "../sections/category/CategoryRow";
import CategoryCard from "../sections/category/CategoryCard";
import CategoryHero from "../sections/category/CategoryHero";
import SkeletonCategoryCard from "../components/SkeletonCategoryCard";
import CategoryCTA from "../sections/category/CategoryCTA";

const Categories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  const { data, isLoading, isError } = useCategories();

  const categories = data?.categories || data || [];

  const filtered = categories.filter(
    (cat) =>
      cat.status === "active" &&
      (cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.slug}`);
  };

  return (
    <>
      <title>Applique Embroidery Designs | Premium Digital Downloads</title>
      <meta
        name="description"
        content="Browse premium applique embroidery designs. Instant download, multiple machine formats, and high-quality stitching files for every project."
      />

      {/* ── Hero ── */}
      <CategoryHero categories={categories} />

      <div className="min-h-screen bg-[#F5F7FA] pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          {/* ══════════ SEARCH & VIEW TOGGLE ══════════ */}
          <div
            className="bg-white border border-[#007BFF]/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm"
            style={{ animation: "fadeInUp 0.5s ease-out 0.15s both" }}
          >
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/50" />
              <input
                type="text"
                placeholder="Search categories…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all text-sm"
              />
              {/* Clear button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#007BFF]/10 text-[#007BFF] flex items-center justify-center hover:bg-[#007BFF]/20 transition text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Divider (desktop) */}
            <div className="hidden sm:block w-px h-8 bg-[#007BFF]/10" />

            {/* Result count (inline on desktop) */}
            {!isLoading && (
              <p className="hidden sm:block text-[#007BFF]/50 text-sm whitespace-nowrap shrink-0">
                {filtered.length === categories.length
                  ? `${filtered.length} categories`
                  : `${filtered.length} of ${categories.length}`}
              </p>
            )}

            {/* View toggle */}
            <div className="flex gap-1 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-[#007BFF] text-white shadow-sm"
                    : "text-[#007BFF]/40 hover:text-[#007BFF]"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-[#007BFF] text-white shadow-sm"
                    : "text-[#007BFF]/40 hover:text-[#007BFF]"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Result count (mobile) ── */}
          {!isLoading && (
            <p className="sm:hidden text-[#007BFF]/50 text-sm mb-5 ml-1">
              {filtered.length === categories.length
                ? `${filtered.length} categories`
                : `${filtered.length} of ${categories.length} categories`}
            </p>
          )}

          {/* ══════════ CONTENT ══════════ */}

          {/* Loading */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCategoryCard key={i} />
              ))}
            </div>
          ) : /* Error */
          isError ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-4 bg-white border border-red-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-red-400 text-xl font-bold">!</span>
              </div>
              <p className="text-lg font-semibold text-[#222222]">
                Unable to load categories
              </p>
              <p className="text-sm text-[#333333]/50 mt-1">
                Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-5 px-5 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition"
              >
                Refresh
              </button>
            </div>
          ) : /* Empty search */
          filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-4 bg-white border border-[#007BFF]/20 rounded-full flex items-center justify-center shadow-sm">
                <Search className="w-7 h-7 text-[#007BFF]/30" />
              </div>
              <p className="text-[#222222] font-semibold text-lg">
                No categories found
              </p>
              <p className="text-[#333333]/50 text-sm mt-1">
                Try a different search term.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-5 px-5 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition"
              >
                Clear Search
              </button>
            </div>
          ) : /* Grid */
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((cat, idx) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onClick={handleCategoryClick}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            /* List */
            <div className="flex flex-col gap-3">
              {filtered.map((cat, idx) => (
                <CategoryRow
                  key={cat.id}
                  category={cat}
                  onClick={handleCategoryClick}
                  index={idx}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <CategoryCTA />
    </>
  );
};

export default Categories;
