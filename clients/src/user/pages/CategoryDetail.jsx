import { useParams } from "react-router-dom";
import { useCategoryWithProducts } from "../../hooks/useCategory";

const CategoryDetail = () => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useCategoryWithProducts(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <p className="text-[#D4AF37] text-lg">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <p className="text-red-500">Something went wrong</p>
      </div>
    );
  }

  const category = data?.category;
  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-[#101010] text-[#E8D7B5] pt-28 pb-16">
      {/* ================= HEADER ================= */}
      <div className="border-b border-[#D4AF37]/20 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#E8D7B5]">
            {category?.name}
          </h1>

          <p className="mt-3 text-[#D4AF37]/70 text-sm md:text-base max-w-2xl mx-auto">
            {category?.description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#101010]">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <span className="text-[#D4AF37] text-sm font-medium">
              {products.length} Products
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-2xl">0</span>
            </div>
            <h3 className="text-xl font-semibold text-[#E8D7B5]">
              No Products Found
            </h3>
            <p className="text-[#D4AF37]/60 mt-2">
              This category has no products yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="h-48 bg-[#101010] overflow-hidden">
                  <img
                    src={product.image?.url || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-[#E8D7B5] font-semibold text-lg mb-2">
                    {product.name}
                  </h3>

                  <p className="text-[#D4AF37]/60 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] font-bold text-lg">
                      ${product.price}
                    </span>

                    <button className="px-4 py-2 text-sm rounded-lg bg-[#D4AF37] text-[#101010] font-semibold hover:bg-[#E8D7B5] transition">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;