import { useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const [active, setActive] = useState(2);
  const [showAll, setShowAll] = useState(false);

  const isLoading = !products;
  const safeProducts = products || [];

  const featuredProducts = safeProducts.filter(
    (item) => item.badge?.toLowerCase() === "premium",
  );

  const displayedProducts = showAll
    ? featuredProducts
    : featuredProducts.slice(0, 4);

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-[#222222] mb-4">
            Featured Designs
          </h2>

          <p className="text-[#007BFF] uppercase tracking-[4px]">
            Premium Collection Only
          </p>
        </div>

        {/* ================= LOADER ================= */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#007BFF]"></div>
            <span className="ml-3 text-[#007BFF]">Loading products...</span>
          </div>
        ) : featuredProducts.length === 0 ? (
          /* ============ NO PRODUCTS ============ */
          <div className="flex justify-center items-center">
            <p className="text-[#333333] text-lg">No premium products found.</p>
          </div>
        ) : (
          <>
            {/* ============ PRODUCTS GRID ============ */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent" />

                  {/* Title */}
                  <div
                    className={`
                      absolute
                      bottom-8
                      left-8
                      transition-all
                      duration-500
                      ${
                        active === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }
                    `}
                  >
                    <h3 className="text-2xl font-bold text-[#222222]">
                      {item.name}
                    </h3>

                    {/* PREMIUM badge */}
                    <span className="inline-block mt-2 text-xs px-3 py-1 bg-[#007BFF] text-white rounded-full font-bold">
                      PREMIUM
                    </span>

                    <div className="mt-3">
                      <Link
                        to={`/store/${item._id}`}
                        className="text-[#007BFF] font-medium"
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
                className="text-white bg-[#007BFF] px-6 py-3 rounded-lg font-bold hover:bg-[#0066CC] transition"
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
