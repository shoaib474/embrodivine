import { useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const [active, setActive] = useState(2);
  const [showAll, setShowAll] = useState(false);

  // ⏳ Loader condition (data not loaded yet)
  const isLoading = !products;

  // Empty safe array fallback
  const safeProducts = products || [];

  // Only premium products
  const featuredProducts = safeProducts.filter(
    (item) => item.badge?.toLowerCase() === "premium",
  );

  const displayedProducts = showAll
    ? featuredProducts
    : featuredProducts.slice(0, 4);

  return (
    <section className="bg-[#1A1A1A] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured Designs
          </h2>

          <p className="text-yellow-500 uppercase tracking-[4px]">
            Premium Collection Only
          </p>
        </div>

        {/* ================= LOADER ================= */}
        {isLoading ? (
          <div className="flex justify-center items-center text-white">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
            <span className="ml-3 text-yellow-500">Loading products...</span>
          </div>
        ) : featuredProducts.length === 0 ? (
          /* ============ NO PRODUCTS ============ */
          <div className="flex justify-center items-center text-white">
            <p className="text-gray-400 text-lg">No premium products found.</p>
          </div>
        ) : (
          /* ============ PRODUCTS GRID ============ */
          <>
            <div className="flex h-[500px] overflow-hidden rounded-3xl">
              {displayedProducts.map((item, index) => (
                <div
                  key={item._id}
                  onMouseEnter={() => setActive(index)}
                  className={`
                    relative
                    overflow-hidden
                    cursor-pointer
                    transition-all
                    duration-700
                    ease-in-out
                    ${active === index ? "flex-[3]" : "flex-1"}
                  `}
                >
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Title */}
                  <div
                    className={`
                      absolute
                      bottom-8
                      left-8
                      text-white
                      transition-all
                      duration-500
                      ${
                        active === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }
                    `}
                  >
                    <h3 className="text-2xl font-bold">{item.name}</h3>

                    {/* PREMIUM badge */}
                    <span className="inline-block mt-2 text-xs px-3 py-1 bg-yellow-500 text-black rounded-full font-bold">
                      PREMIUM
                    </span>

                    <div className="mt-3">
                      <Link
                        to={`/store/${item._id}`}
                        className="text-yellow-500 font-medium"
                      >
                        View Design →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center mt-10">
              <Link
                to="/store"
                className="text-black bg-yellow-500 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                Show More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
