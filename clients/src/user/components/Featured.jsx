import React, { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);

  // Featured products
  const featuredProducts = products;

  // Limit to 6 initially
  const displayedProducts = showAll
    ? featuredProducts
    : featuredProducts.slice(0, 6);

  return (
    <section className="py-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/store/${product._id}`)}
              className="group bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#D4AF37]/20 p-3 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image.url}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-4 space-y-2">
                <h3 className="text-white font-semibold text-lg line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="block text-yellow-500 font-bold text-left text-xl">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-2 py-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-[#D4AF37]/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-500 text-sm">
                      ({product.rating})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/store"
          className="mt-8 inline-flex items-center gap-2 bg-yellow-500 text-[#101010] px-6 py-3 rounded-lg font-bold hover:bg-[#E8D7B5] transition-all"
        >
          More
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
