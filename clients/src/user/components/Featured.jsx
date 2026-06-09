// import React, { useState } from "react";
// import { ArrowRight, Star } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// const FeaturedProducts = ({ products }) => {
//   const navigate = useNavigate();

//   const [showAll, setShowAll] = useState(false);

//   // Featured products
//   const featuredProducts = products;

//   // Limit to 6 initially
//   const displayedProducts = showAll
//     ? featuredProducts
//     : featuredProducts.slice(0, 6);

//   return (
//     <section className="py-16 bg-[#0A0A0A]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-4xl font-bold text-yellow-500 mb-6">
//           Featured Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {displayedProducts.map((product) => (
//             <div
//               key={product._id}
//               onClick={() => navigate(`/store/${product._id}`)}
//               className="group bg-[#1A1A1A] rounded-2xl overflow-hidden border border-yellow-500/20 p-3 cursor-pointer"
//             >
//               {/* Image */}
//               <div className="relative w-full aspect-square overflow-hidden rounded-xl">
//                 <img
//                   src={product.image.url}
//                   alt={product.name}
//                   loading="lazy"
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               {/* Content */}
//               <div className="mt-4 space-y-2">
//                 <h3 className="text-white font-semibold text-lg line-clamp-1">
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center justify-between">
//                   <span className="block text-yellow-500 font-bold text-left text-xl">
//                     ${product.price}
//                   </span>
//                   <div className="flex items-center gap-2 py-2">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(product.rating)
//                               ? "text-yellow-500 fill-current"
//                               : "text-yellow-500/30"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-yellow-500 text-sm">
//                       ({product.rating})
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Link
//           to="/store"
//           className="mt-8 inline-flex items-center gap-2 bg-yellow-600 text-[#101010] px-6 py-3 rounded-lg font-bold hover:bg-[#E8D7B5] transition-all"
//         >
//           More
//           <ArrowRight className="w-5 h-5" />
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);

  const featuredProducts = products;

  // Limit to 6 initially
  const displayedProducts = showAll
    ? featuredProducts
    : featuredProducts.slice(0, 4);

  return (
    <section className="bg-[#1A1A1A] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured Designs
          </h2>

          <p className="text-yellow-500 uppercase tracking-[4px]">
            Discover Our Best Selling Collection
          </p>
        </div>

        {displayedProducts.length === 0 ? (
          <p className="text-gray-400 text-center">
            No featured products available.
          </p>
        ) : (
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
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-transparent
                "
                />

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

                  <Link
                    to={`/store/${item._id}`}
                    className="mt-3 text-yellow-500 font-medium"
                  >
                    View Design →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            to="/store"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-[#101010] px-6 py-3 rounded-lg font-bold hover:bg-[#E8D7B5] transition-all"
          >
            More
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
