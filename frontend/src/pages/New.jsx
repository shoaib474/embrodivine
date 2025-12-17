// src/pages/Collection.jsx
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

const Collection = () => {
  const products = [
    {
      id: 1,
      name: "Logo Digitizing Sample",
      description: "High-quality embroidery-ready file of a sample logo.",
      price: "$15",
      image: "https://via.placeholder.com/400x400?text=Sample+Product",
    },
    // You can add more products here
  ];

  return (
    <>
      <Helmet>
        <title>Collection | StitchPro - Embroidery Digitizing</title>
        <meta
          name="description"
          content="Browse our collection of embroidery digitizing samples. Professional designs ready for machine embroidery."
        />
      </Helmet>

      <section className="pt-24 md:pt-32 pb-20 bg-[#FFF4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#78866B] mb-4">
              Our Collection
            </h1>
            <p className="text-lg text-[#78866B]/70 max-w-2xl mx-auto">
              Explore our embroidery digitizing samples. Perfect for inspiration and customization.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="aspect-square bg-[#FFF4E6] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#78866B] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#78866B]/70 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-[#D8A657] mb-4">
                  {product.price}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#D8A657] to-[#B7410E] text-[#FFF4E6] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Get This Design
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Collection;
