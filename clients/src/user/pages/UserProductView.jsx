import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  ShoppingCart,
  Heart,
  Star,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

import Error500 from "../components/Error500";
import SpinnerLoader from "../components/SpinnerLoader";
import ShareModal from "../components/ShareModal";
import { useAddToCart, useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import { useFavorites, useToggleFavorite } from "../../hooks/useFavorites";

const UserProductView = () => {
  const { id } = useParams();

  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { mutate, isPending } = useAddToCart();
  const { data, isLoading, isError } = useProduct(id);
  const { data: favData } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const [addedToCart, setAddedToCart] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const defaultFeatures = [
    "High-quality embroidered design",
    "Iron-on or sew-on backing",
    "Durable polyester thread",
    "Machine washable",
    "Made with premium materials",
  ];

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
      }
    : {
        images: [],
        pdfs: [],
        sizes: ["small", "medium", "large"],
        features: defaultFeatures,
        price: 0,
        rating: 0,
        reviews: 0,
        name: "",
        category: "",
        description: "",
        dimensions: "",
        weight: "",
        material: "",
        colors: [],
      };
  const cart = cartData?.products || [];

  const isProductInCart = (productId) => {
    return cart?.some(
      (item) =>
        item.productId?._id === productId || item.productId === productId,
    );
  };

  const [selectedMedia, setSelectedMedia] = useState({
    type: "image", // "image" | "pdf"
    index: 0,
  });
  const mediaList = [
    ...product.images.map((img) => ({ type: "image", src: img })),
    ...product.pdfs.map((pdf) => ({ type: "pdf", src: pdf })),
  ];

  const favorites = favData?.favorites?.map((f) => f.product?._id) || [];

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  const nextMedia = () => {
    setSelectedMedia((prev) => {
      const currentIndex = mediaList.findIndex(
        (m, i) => m.type === prev.type && i === prev.index,
      );

      const nextIndex = (currentIndex + 1) % mediaList.length;
      return {
        type: mediaList[nextIndex].type,
        index:
          mediaList
            .slice(0, nextIndex + 1)
            .filter((m) => m.type === mediaList[nextIndex].type).length - 1,
      };
    });
  };

  const prevMedia = () => {
    setSelectedMedia((prev) => {
      const currentIndex = mediaList.findIndex(
        (m, i) => m.type === prev.type && i === prev.index,
      );

      const prevIndex =
        (currentIndex - 1 + mediaList.length) % mediaList.length;

      return {
        type: mediaList[prevIndex].type,
        index:
          mediaList
            .slice(0, prevIndex + 1)
            .filter((m) => m.type === mediaList[prevIndex].type).length - 1,
      };
    });
  };

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <Error500 />;

  return (
    <div className="min-h-screen bg-[#101010] pt-24">
      {/* Breadcrumb */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/store"
            className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
          >
            Store
          </Link>
          <span className="text-[#D4AF37]/50">/</span>
          <Link
            to={`/category/${product.category.toLocaleLowerCase().replace(/\s+/g, "-")}`}
            className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-[#D4AF37]/50">/</span>
          <span className="text-[#E8D7B5]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:pb-12">
        {/* Success Message */}
        {addedToCart && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-fade-in">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-500 font-semibold">
              Added to cart successfully!
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/20 group shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {selectedMedia.type === "image" ? (
                <>
                  <Zoom>
                    <img
                      src={product?.images[selectedMedia.index]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  </Zoom>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#101010]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101010] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#101010]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101010] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#101010]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </>
              ) : (
                <iframe
                  src={product.pdfs[selectedMedia.index]}
                  title="PDF Preview"
                  className="w-full h-full rounded-2xl"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={`img-${idx}`}
                  onClick={() =>
                    setSelectedMedia({ type: "image", index: idx })
                  }
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedMedia.type === "image" &&
                    selectedMedia.index === idx
                      ? "border-[#D4AF37] shadow-lg"
                      : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-md"
                  }`}
                >
                  <img
                    src={img}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}

              {product.pdfs.map((pdf, idx) => (
                <button
                  key={`pdf-${idx}`}
                  onClick={() => setSelectedMedia({ type: "pdf", index: idx })}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center bg-[#101010] border-2 text-sm font-semibold transition-all duration-300 ${
                    selectedMedia.type === "pdf" && selectedMedia.index === idx
                      ? "border-[#D4AF37] shadow-lg"
                      : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-md"
                  }`}
                >
                  📄
                  <span className="mt-1 text-[#E8D7B5] text-xs sm:text-sm">
                    PDF
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title & Favorite */}
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E8D7B5] tracking-tight">
                {product.name}
              </h1>

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
                    favorites.includes(product._id) ? "#D4AF37" : "transparent"
                  }
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-[#FFD700] fill-current"
                        : "text-[#D4AF37]/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#E8D7B5] font-semibold">
                {product.rating}
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-tight">
              ${product.price}
            </p>

            {/* Description */}
            <p className="text-[#D4AF37]/80 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* PDF Section */}
            {product.pdfs?.url && (
              <div className="rounded-xl bg-[#101010]/80 border border-[#D4AF37]/20 p-4 flex items-center justify-between gap-4 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all">
                <div>
                  <p className="text-[#E8D7B5] font-semibold">
                    {product.name} - PDF
                  </p>
                  <p className="text-[#D4AF37]/80 text-sm">
                    {product.dimensions}
                  </p>
                </div>
                <Link
                  to={product.pdfs.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-[#D4AF37] text-[#101010] font-semibold rounded-lg hover:bg-[#E8D7B5] transition"
                >
                  Download PDF
                </Link>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => {
                  if (!isProductInCart(product._id)) {
                    mutate({ productId: product._id, qty: 1 });
                  }
                  setAddedToCart(true);
                }}
                disabled={isPending || isProductInCart(product._id)}
                className={`flex-1 px-6 sm:px-8 py-4 rounded-lg font-bold transition-all duration-300 transform flex items-center justify-center gap-2 text-base sm:text-lg  
        ${
          isProductInCart(product._id)
            ? "bg-green-600 text-white cursor-not-allowed"
            : "bg-[#D4AF37] text-[#101010] hover:bg-[#E8D7B5] cursor-pointer shadow-lg shadow-[#D4AF37]/30 hover:scale-105"
        }`}
              >
                {isProductInCart(product._id) ? (
                  "In Cart"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="px-6 py-4 bg-[#1A1A1A] border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div
          className="bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E]
border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 mb-12
shadow-[0_0_30px_rgba(212,175,55,0.06)]"
        >
          <div className="space-y-10">
            {/* FEATURES */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                Features
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl
            bg-[#101010] border border-[#D4AF37]/20
            hover:border-[#D4AF37]/50 transition"
                  >
                    <Check className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E8D7B5] text-sm sm:text-base leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

            {/* SPECIFICATIONS */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dimensions */}
                {product?.dimensions && (
                  <div
                    className="bg-gradient-to-br from-[#121212] to-[#0C0C0C]
          border border-[#D4AF37]/20 rounded-xl p-5
          hover:border-[#D4AF37]/50 transition"
                  >
                    <p className="text-[#D4AF37]/60 text-xs uppercase tracking-wider mb-1">
                      Dimensions
                    </p>
                    <p className="text-[#E8D7B5] font-semibold text-sm sm:text-base">
                      {product.dimensions} inches
                    </p>
                  </div>
                )}

                {/* Colors */}
                {product?.colors && (
                  <div
                    className="bg-gradient-to-br from-[#121212] to-[#0C0C0C]
          border border-[#D4AF37]/20 rounded-xl p-5
          hover:border-[#D4AF37]/50 transition"
                  >
                    <p className="text-[#D4AF37]/60 text-xs uppercase tracking-wider mb-1">
                      Colors
                    </p>
                    <p className="text-[#E8D7B5] font-semibold text-sm sm:text-base">
                      {product.colors}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          productData={product}
        />
      </div>
    </div>
  );
};

export default UserProductView;
