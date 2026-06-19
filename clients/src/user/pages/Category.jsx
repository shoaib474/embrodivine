import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid3X3, List, Tag } from "lucide-react";
import { useCategories } from "../../hooks/useCategory";

// ─── Mock data (swap for real API hook) ────────────────────────────────────
// const MOCK_CATEGORIES = [
//   {
//     id: 1,
//     name: "Cartoon & Kids",
//     slug: "cartoon-kids",
//     description: "Fun and colorful designs for children",
//     image:
//       "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=400&fit=crop",
//     icon: "baby",
//     status: "active",
//     productCount: 45,
//     seoTitle: "Cartoon & Kids Embroidery Patches",
//     seoDescription:
//       "Browse our collection of cartoon and kids embroidery designs",
//     createdDate: "2024-01-15",
//   },
//   {
//     id: 2,
//     name: "Floral & Nature",
//     slug: "floral-nature",
//     description: "Elegant botanical and nature-inspired embroidery",
//     image:
//       "https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=600&h=400&fit=crop",
//     icon: "flower",
//     status: "active",
//     productCount: 78,
//     seoTitle: "Floral & Nature Embroidery",
//     seoDescription: "Discover beautiful floral and nature embroidery patterns",
//     createdDate: "2024-01-18",
//   },
//   {
//     id: 3,
//     name: "Sports & Teams",
//     slug: "sports-teams",
//     description: "Athletic logos, team crests and sport emblems",
//     image:
//       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
//     icon: "trophy",
//     status: "active",
//     productCount: 62,
//     seoTitle: "Sports & Teams Embroidery",
//     seoDescription: "Custom sports and team embroidery digitizing",
//     createdDate: "2024-02-02",
//   },
//   {
//     id: 4,
//     name: "Monograms & Text",
//     slug: "monograms-text",
//     description: "Personalized lettering and custom monogram styles",
//     image:
//       "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
//     icon: "type",
//     status: "active",
//     productCount: 91,
//     seoTitle: "Monograms & Text Embroidery",
//     seoDescription: "Custom monogram and text embroidery digitizing services",
//     createdDate: "2024-02-10",
//   },
//   {
//     id: 5,
//     name: "Animals & Wildlife",
//     slug: "animals-wildlife",
//     description: "Detailed animal portraits and wildlife art",
//     image:
//       "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=400&fit=crop",
//     icon: "paw",
//     status: "active",
//     productCount: 53,
//     seoTitle: "Animal Embroidery Designs",
//     seoDescription: "Beautiful animal and wildlife embroidery digitizing",
//     createdDate: "2024-03-05",
//   },
//   {
//     id: 6,
//     name: "Logos & Branding",
//     slug: "logos-branding",
//     description: "Professional logo digitizing for apparel and merchandise",
//     image:
//       "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
//     icon: "brand",
//     status: "active",
//     productCount: 120,
//     seoTitle: "Logo Embroidery Digitizing",
//     seoDescription: "High-quality logo embroidery digitizing for businesses",
//     createdDate: "2024-03-12",
//   },
// ];

// ─── Simulated fetch hook ───────────────────────────────────────────────────
// Replace this with your real hook e.g. useCategories()
function useCategoriesMock() {
  return {
    data: MOCK_CATEGORIES,
    isLoading: false,
    isError: false,
    error: null,
  };
}

// ─── Skeleton Card ──────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-[#D4AF37]/10" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-[#D4AF37]/10 rounded w-2/3" />
      <div className="h-3 bg-[#D4AF37]/10 rounded w-full" />
      <div className="h-3 bg-[#D4AF37]/10 rounded w-4/5" />
      <div className="h-8 bg-[#D4AF37]/10 rounded-lg w-1/3 mt-2" />
    </div>
  </div>
);

// ─── Category Card (grid) ───────────────────────────────────────────────────
const CategoryCard = ({ category, onClick, index }) => (
  <div
    onClick={() => onClick(category)}
    className="group bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden cursor-pointer hover:border-[#D4AF37] hover:shadow-[0_0_24px_rgba(212,175,55,0.15)] transition-all duration-300"
    style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.07}s both` }}
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={category.thumbnail.url}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop";
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent" />

      {/* Product count badge */}
      <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#101010] text-xs font-bold px-2.5 py-1 rounded-full">
        {category.productCount} designs
      </span>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-[#E8D7B5] font-bold text-lg mb-1.5 group-hover:text-[#D4AF37] transition-colors duration-200">
        {category.name}
      </h3>
      <p className="text-[#D4AF37]/60 text-sm leading-relaxed line-clamp-2 mb-4">
        {category.description}
      </p>

      <button
        className="inline-flex items-center gap-1.5 text-[#D4AF37] text-sm font-semibold border border-[#D4AF37]/40 rounded-lg px-4 py-1.5 group-hover:bg-[#D4AF37] group-hover:text-[#101010] transition-all duration-200"
        tabIndex={-1}
      >
        <Tag className="w-3.5 h-3.5" />
        Browse
      </button>
    </div>
  </div>
);

// ─── Category Row (list) ────────────────────────────────────────────────────
const CategoryRow = ({ category, onClick, index }) => (
  <div
    onClick={() => onClick(category)}
    className="group bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#D4AF37] hover:shadow-[0_0_16px_rgba(212,175,55,0.12)] transition-all duration-300 flex items-center gap-0"
    style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both` }}
  >
    <div className="w-28 h-24 shrink-0 overflow-hidden">
      <img
        src={category.thumbnail.url}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop";
        }}
      />
    </div>

    <div className="flex-1 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[#E8D7B5] font-bold text-base group-hover:text-[#D4AF37] transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-[#D4AF37]/60 text-sm mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>
        <span className="shrink-0 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
          {category.productCount} designs
        </span>
      </div>
    </div>

    <div className="pr-5">
      <span className="text-[#D4AF37]/40 group-hover:text-[#D4AF37] text-xl transition-colors duration-200">
        →
      </span>
    </div>
  </div>
);

// ─── Main Page ──────────────────────────────────────────────────────────────
const Categories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // const { data: categories = [], isLoading, isError } = useCategoriesMock();
  // Replace useCategoriesMock() with your real hook:
  const { data, isLoading, isError } = useCategories();

  const categories = data?.categories || data || [];
  console.log(categories);
  

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
      <div className="min-h-screen bg-[#101010] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          {/* ── Hero header ── */}
          <div
            className="mb-10 text-center"
            style={{ animation: "fadeInUp 0.5s ease-out both" }}
          >
            <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-3">
              Embrodivine Collections
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8D7B5] leading-tight">
              Browse by Category
            </h1>
            <p className="mt-4 text-[#D4AF37]/60 text-base sm:text-lg max-w-xl mx-auto">
              Choose a category to explore our hand-crafted embroidery designs
            </p>

            {/* Decorative rule */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-16 bg-[#D4AF37]/30" />
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]/60" />
              <div className="h-px w-16 bg-[#D4AF37]/30" />
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div
            className="flex justify-center gap-8 mb-10"
            style={{ animation: "fadeInUp 0.5s ease-out 0.1s both" }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">
                {categories.length}
              </p>
              <p className="text-[#E8D7B5]/50 text-xs uppercase tracking-wider mt-0.5">
                Categories
              </p>
            </div>
            <div className="w-px bg-[#D4AF37]/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">
                {categories.reduce((s, c) => s + c.productCount, 0)}+
              </p>
              <p className="text-[#E8D7B5]/50 text-xs uppercase tracking-wider mt-0.5">
                Designs
              </p>
            </div>
            <div className="w-px bg-[#D4AF37]/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">100%</p>
              <p className="text-[#E8D7B5]/50 text-xs uppercase tracking-wider mt-0.5">
                Custom
              </p>
            </div>
          </div>

          {/* ── Search & view toggle ── */}
          <div
            className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3 items-center"
            style={{ animation: "fadeInUp 0.5s ease-out 0.15s both" }}
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
              <input
                type="text"
                placeholder="Search categories…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/40 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
              />
            </div>

            {/* View toggle */}
            <div className="flex gap-1 bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-1 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-[#D4AF37] text-[#101010]"
                    : "text-[#D4AF37]/50 hover:text-[#D4AF37]"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-[#D4AF37] text-[#101010]"
                    : "text-[#D4AF37]/50 hover:text-[#D4AF37]"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Result count ── */}
          {!isLoading && (
            <p className="text-[#D4AF37]/50 text-sm mb-5">
              {filtered.length === categories.length
                ? `${filtered.length} categories`
                : `${filtered.length} of ${categories.length} categories`}
            </p>
          )}

          {/* ── Content ── */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-24 text-[#D4AF37]/50">
              <p className="text-lg font-semibold text-[#E8D7B5]">
                Unable to load categories
              </p>
              <p className="text-sm mt-1">Please try refreshing the page.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Search className="w-10 h-10 text-[#D4AF37]/30 mx-auto mb-4" />
              <p className="text-[#E8D7B5] font-semibold text-lg">
                No categories found
              </p>
              <p className="text-[#D4AF37]/50 text-sm mt-1">
                Try a different search term.
              </p>
            </div>
          ) : viewMode === "grid" ? (
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
    </>
  );
};

export default Categories;
