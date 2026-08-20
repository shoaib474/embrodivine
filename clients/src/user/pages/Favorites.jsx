import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";

import { useFavorites, useToggleFavorite } from "../../hooks/useFavorites";

import FavoriteSkeleton from "../components/FavoriteSkeleton";

const Favorites = () => {
  const { data: favData, isLoading } = useFavorites();
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

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
    <div className="space-y-6 animate-fade-in border border-slate-200 rounded-3xl p-6 sm:p-8 bg-[#ffffff]">
      <h2 className="text-2xl font-bold text-[#222222]">My Favorites</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FavoriteSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl p-8 flex flex-col items-center space-y-4 shadow-lg animate-fade-in">
            <Heart className="w-12 h-12 text-[#007BFF] animate-pulse" />
            <h3 className="text-[#222222] text-xl font-semibold">
              No Favorites Yet
            </h3>
            <p className="text-[#6B7280] text-center max-w-xs">
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
              className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#007BFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image || "/placeholder.png"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                <Heart
                  onClick={() => handleToggleFavorite(item._id)}
                  disabled={isPending}
                  className={`absolute top-3 right-3 w-6 h-6 cursor-pointer drop-shadow-md transition-all ${
                    isFavorite(item._id)
                      ? "text-[#007BFF] scale-110"
                      : "text-white/80 hover:text-[#007BFF]"
                  }`}
                  fill={isFavorite(item._id) ? "#007BFF" : "transparent"}
                />
              </div>

              <div className="p-4">
                <h3 className="text-[#222222] font-bold mb-2">{item.name}</h3>

                <div>
                  <span className="text-[#222222] font-bold text-xl block">
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
                              ? "text-[#ff9d00]"
                              : "text-[#ff9d00]/30"
                          }`}
                          fill={i < item.rating ? "#ff9d00" : "transparent"}
                        />
                      ))}
                    </div>

                    <span className="text-sm text-[#6B7280]">
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
