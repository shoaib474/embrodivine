import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";

import { useFavorites, useToggleFavorite } from "../../hooks/useFavorites";

import FavoriteSkeleton from "../components/FavoriteSkeleton";

const Favorites = () => {
  const { data: favData, isLoading } = useFavorites();
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  console.log("favourite", favData?.favorites);

  const favorites =
    favData?.favorites
      ?.filter((f) => f.product) // remove null products
      ?.map((f) => ({
        _id: f.product._id,
        name: f.product.name,
        price: f.product.price,
        rating: f.product.rating || 0,
        image: f.product.image?.url || f.product.image || "",
      })) || [];
  console.log("favorite product IDs", favorites);

  const isFavorite = (productId) => {
    return favorites.some((item) => item._id === productId);
  };

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <FavoriteSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#E8D7B5]">My Favorites</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FavoriteSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-[#2A2A2A] border border-[#D4AF37]/30 rounded-xl p-8 flex flex-col items-center space-y-4 shadow-lg animate-fade-in">
            <Heart className="w-12 h-12 text-[#D4AF37] animate-pulse" />
            <h3 className="text-[#E8D7B5] text-xl font-semibold">
              No Favorites Yet
            </h3>
            <p className="text-white/70 text-center max-w-xs">
              You haven't added any products to your favorites. Click the heart
              icon on any product to save it here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item, idx) => (
            <div
              key={item._id}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image || "/placeholder.png"}
                  className="w-full h-full object-cover"
                />

                <Heart
                  onClick={() => handleToggleFavorite(item._id)}
                  disabled={isPending}
                  className={`absolute top-3 right-3 w-6 h-6 cursor-pointer drop-shadow-md transition-all ${
                    isFavorite(item._id)
                      ? "text-[#D4AF37] scale-110"
                      : "text-white/70 hover:text-[#D4AF37]"
                  }`}
                  fill={isFavorite(item._id) ? "#D4AF37" : "transparent"}
                />
              </div>

              <div className="p-4">
                <h3 className="text-[#E8D7B5] font-bold mb-2">{item.name}</h3>
                <div>
                  <span className="text-[#D4AF37] font-bold text-xl block">
                    ${item.price}
                  </span>

                  {/* Rating */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? "text-[#D4AF37]"
                              : "text-[#D4AF37]/30"
                          }`}
                          fill={i < item.rating ? "#D4AF37" : "transparent"}
                        />
                      ))}
                    </div>

                    <span className="text-sm text-[#D4AF37]/70">
                      {item.rating ? item.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
