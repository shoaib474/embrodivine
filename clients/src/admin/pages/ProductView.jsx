import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

import Error500 from "../../user/components/Error500";
import SpinnerLoader from "../../user/components/SpinnerLoader";

import { useProduct } from "../../hooks/useProduct";

const ProductView = () => {
  const { id } = useParams();

  const [selectedMedia, setSelectedMedia] = useState({
    type: "image", // "image" | "pdf"
    index: 0,
  });

  const defaultFeatures = [
    "High-quality embroidered design",
    "Iron-on or sew-on backing",
    "Durable polyester thread",
    "Machine washable",
    "Made with premium materials",
  ];

  const { data, isLoading, isError } = useProduct(id);

  const product = data?.product
    ? {
        _id: data.product._id,
        images: data.product.image?.url ? [data.product.image.url] : [],
        pdfs: data.product.pdf?.url ? [data.product.pdf.url] : [],
        sizes: data.product.sizes || ["small", "medium", "large"],
        features:
          Array.isArray(data.product.features) &&
          data.product.features.length > 0
            ? data.product.features
            : defaultFeatures,
        price: data.product.price || 0,
        rating: data.product.rating || 0,
        reviews: data.product.reviews || 0,
        name: data.product.name || "",
        category: data.product.category || "",
        description: data.product.description || "",
        dimensions: data.product.dimensions || "",
        weight: data.product.weight || "",
        material: data.product.material || "",
        colors: data.product.colors || [],
        productStatus: data.product.productStatus || "active",
        createdAt: data.product.createdAt || new Date(),
      }
    : {
        images: [],
        pdfs: [],
        sales: 0,
        stock: 0,
        price: 0,
        rating: 0,
        reviews: 0,
        name: "",
        sku: "",
        dateAdded: new Date(),
        category: "",
        dimensions: "",
        weight: "",
        material: "",
        colors: "",
        status: "active",
      };

  const stats = [
    // {
    //   title: "Total Sales",
    //   value: product.sales,
    //   icon: ShoppingCart,
    //   color: "#D4AF37",
    // },
    // {
    //   title: "Revenue",
    //   value: `$${(product.sales * product.price).toFixed(0)}`,
    //   icon: DollarSign,
    //   color: "#32CD32",
    // },
    { title: "Rating", value: product.rating, icon: Star, color: "#FFD700" },
  ];

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <Error500 />;

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8D7B5]">
                Product Details
              </h1>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-6 hover:border-[#D4AF37] transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
                <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Images */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_30px_rgba(212,175,55,0.06)]">
              {/* Header */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                Product Gallery
              </h2>

              {/* Main Preview */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-black border border-[#D4AF37]/30 group">
                {selectedMedia.type === "image" ? (
                  <img
                    src={product?.images[selectedMedia.index]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <iframe
                    src={product.pdfs[selectedMedia.index]}
                    title="PDF Preview"
                    className="w-full h-full bg-black"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-[#D4AF37]/20 rounded-2xl"></div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {/* Image Thumbnails */}
                {product.images.map((img, idx) => (
                  <button
                    key={`img-${idx}`}
                    onClick={() =>
                      setSelectedMedia({ type: "image", index: idx })
                    }
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300
          ${
            selectedMedia.type === "image" && selectedMedia.index === idx
              ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
          }
        `}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))}

                {/* PDF Thumbnails */}
                {product.pdfs.map((pdf, idx) => (
                  <button
                    key={`pdf-${idx}`}
                    onClick={() =>
                      setSelectedMedia({ type: "pdf", index: idx })
                    }
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border-2 bg-gradient-to-br from-[#121212] to-[#0C0C0C] transition-all duration-300
          ${
            selectedMedia.type === "pdf" && selectedMedia.index === idx
              ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
          }
        `}
                  >
                    <span className="text-2xl">📄</span>
                    <span className="text-xs font-semibold text-[#E8D7B5] tracking-wide">
                      PDF
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-7 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
              {/* Header */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                Product Information
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-1">
                    Product Name
                  </p>
                  <p className="text-[#E8D7B5] font-semibold text-lg sm:text-xl tracking-wide">
                    {product.name}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-1">
                    Category
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#E8D7B5] text-sm capitalize">
                    {product?.category}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-2">
                    Description
                  </p>
                  <p className="text-[#D4AF37]/80 leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>

                {/* PDF Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[#101010] border border-[#D4AF37]/20 rounded-xl p-4">
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-[#E8D7B5] font-semibold text-base">
                      {product.name}
                    </p>
                    <p className="text-[#D4AF37]/70 text-base">
                      {product.dimensions}
                    </p>
                    <p>– PDF</p>
                  </div>

                  {product.pdfs?.[0] && (
                    <Link
                      to={product.pdfs[0]}
                      target="_blank"
                      download
                      className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#101010] font-semibold text-sm hover:bg-[#E8D7B5] transition-all duration-300"
                    >
                      Download PDF
                    </Link>
                  )}
                </div>

                {/* Price */}
                <div>
                  <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-1">
                    Price
                  </p>
                  <p className="text-[#D4AF37] font-bold text-2xl sm:text-3xl">
                    ${product?.price}
                  </p>
                </div>

                {/* Specifications */}
                <div>
                  <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-3">
                    Specifications
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#121212] to-[#0C0C0C] border border-[#D4AF37]/20 rounded-xl p-4 hover:border-[#D4AF37]/50 transition">
                      <p className="text-[#D4AF37]/60 text-xs mb-1">
                        Dimensions
                      </p>
                      <p className="text-[#E8D7B5] font-semibold text-sm">
                        {product?.dimensions} inches
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] to-[#0C0C0C] border border-[#D4AF37]/20 rounded-xl p-4 hover:border-[#D4AF37]/50 transition">
                      <p className="text-[#D4AF37]/60 text-xs mb-1">Colors</p>
                      <p className="text-[#E8D7B5] font-semibold text-sm">
                        {product?.colors}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* STATUS */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_25px_rgba(212,175,55,0.06)]">
              <h3 className="text-lg sm:text-xl font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#D4AF37] rounded-full"></span>
                Status
              </h3>

              <span
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold capitalize tracking-wide
        ${
          product?.productStatus === "active"
            ? "bg-green-500/15 text-green-400 border border-green-500/30"
            : product?.productStatus === "draft"
              ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
              : "bg-gray-500/15 text-gray-400 border border-gray-500/30"
        }
      `}
              >
                ● {product?.productStatus}
              </span>
            </div>

            {/* REVIEWS */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_25px_rgba(212,175,55,0.06)]">
              <h3 className="text-lg sm:text-xl font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#D4AF37] rounded-full"></span>
                Customer Reviews
              </h3>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 transition ${
                        i < Math.floor(product.rating)
                          ? "text-[#FFD700] fill-current drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
                          : "text-[#D4AF37]/30"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-2xl font-bold text-[#E8D7B5]">
                  {product.rating}
                </span>
              </div>

              <p className="text-sm text-[#D4AF37]/70">
                Based on{" "}
                <span className="font-semibold">{product.reviews}</span> reviews
              </p>
            </div>

            {/* PRODUCT META */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_25px_rgba(212,175,55,0.06)]">
              <h3 className="text-lg sm:text-xl font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#D4AF37] rounded-full"></span>
                Product Meta
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-xl p-4">
                  <p className="text-[#D4AF37]/60 text-xs mb-1">Product ID</p>
                  <p className="text-[#E8D7B5] font-semibold text-sm break-all">
                    {product._id}
                  </p>
                </div>

                <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-xl p-4">
                  <p className="text-[#D4AF37]/60 text-xs mb-1">Date Added</p>
                  <p className="text-[#E8D7B5] font-semibold text-sm">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
