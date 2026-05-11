import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Package, Archive } from "lucide-react";

import AddProductModal from "../components/AddProductModal";
import NoProducts from "../components/NoProducts";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/EditProductModal";
import SpinnerLoader from "../../user/components/SpinnerLoader";

import {
  buildProductFormData,
  useAddProduct,
  useDeleteProduct,
  useProducts,
} from "../../hooks/useProduct";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: productsData,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProducts();
  const { mutate: addProduct, isPending } = useAddProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const products = productsData?.pages.flatMap((page) => page.products) || [];

  const categories = React.useMemo(() => {
    if (!products?.length) return ["all"];

    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const name = product.name || ""; // fallback to empty string
    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (data) => {
    const formData = buildProductFormData(data);

    addProduct(formData, {
      onSuccess: () => {
        setShowAddModal(false);
      },
    });
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    deleteProduct(id);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleViewProduct = (product) => {
    if (!product?._id) return; // safety check
    navigate(`/admin/products/${product._id}`);
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "#D4AF37",
    },
    // {
    //   title: "Total Sales",
    //   value: products.reduce((sum, p) => sum + p.sales, 0),
    //   icon: TrendingUp,
    //   color: "#32CD32",
    // },
    // {
    //   title: "Revenue",
    //   value: `$${products
    //     .reduce((sum, p) => sum + p.price * p.sales, 0)
    //     .toFixed(0)}`,
    //   icon: DollarSign,
    //   color: "#4169E1",
    // },
    {
      title: "Categories",
      value: new Set(products.map((p) => p.category)).size,
      icon: Archive,
      color: "#FF69B4",
    },
  ];

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8D7B5] mb-2">
            Products Management
          </h1>
          <p className="text-sm sm:text-base text-[#D4AF37]/70">
            Manage your embroidery products inventory
          </p>
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

        {/* Filters & Actions */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/60" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-colors capitalize text-sm sm:text-base"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="inline">Add Product</span>
            <span className="sm:hidden w-full">Add</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <SpinnerLoader />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={() => handleDeleteProduct(product._id)}
                onView={() => handleViewProduct(product)}
                isLoading={isLoading}
                isError={isError}
              />
            ))}
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 
             bg-black text-white border border-gray-700
             hover:bg-white hover:text-black hover:border-black
             disabled:opacity-50 disabled:cursor-not-allowed
             flex items-center justify-center gap-2 min-w-[160px] m-auto mb-12"
            >
              {isFetchingNextPage ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </>
              ) : hasNextPage ? (
                "Load More"
              ) : (
                "No More Products"
              )}
            </button>
          </div>
        ) : (
          <NoProducts />
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <AddProductModal
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            handleAddProduct={handleAddProduct}
            loading={isPending}
            categories={categories.filter((c) => c !== "all")}
          />
        )}

        {showEditModal && selectedProduct && (
          <EditProductModal
            setShowEditModal={setShowEditModal}
            product={selectedProduct} // product to edit
          />
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
