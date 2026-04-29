import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const AddProductModal = ({
  showAddModal,
  setShowAddModal,
  loading,
  categories,
  handleAddProduct,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    // Convert files to FormData for backend
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    handleAddProduct(data); // send FormData to backend
    reset();
  };

  const zip = watch("zip");
  const image = watch("image");
  const pdf = watch("pdf");

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 "
      onClick={() => setShowAddModal(false)}
    >
      <div
        className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8 max-w-md w-full animate-scale-in max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
            Add New Product
          </h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="text-[#D4AF37] hover:text-[#E8D7B5]"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Product Name
            </label>
            <input
              {...register("name", { required: true, minLength: 3 })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                Name is required (min 3 chars)
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Description
            </label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                Description must be at least 10 chars
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Category
            </label>
            <input
              {...register("category")}
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="Enter Category name"
            />

            {errors.category && (
              <p className="text-red-500 text-sm">
                Name is required (min 3 chars)
              </p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true, min: 0 })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Price must be positive</p>
              )}
            </div>

            <div>
              <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
                Rating (1-5)
              </label>
              <input
                type="number"
                step="0.1"
                min={1}
                max={5}
                {...register("rating", {
                  min: 1,
                  max: 5,
                  valueAsNumber: true,
                })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
                placeholder="3"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm">Rating must be 1-5</p>
              )}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Badge
            </label>
            <input
              {...register("badge")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="e.g., Bestseller"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Dimensions
            </label>
            <input
              {...register("dimensions")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder='e.g. 3" x 4"'
            />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Colors
            </label>
            <input
              {...register("colors")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="e.g. 3 (number of colors)"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <div>
              <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
                Zip File
              </label>
              <input
                type="file"
                accept=".zip"
                {...register("zip")}
                className="w-full text-sm sm:text-base"
              />
            </div>
            {zip && zip.length > 0 && (
              <p className="text-[#D4AF37] text-sm">{zip[0].name}</p>
            )}

            <div className="mt-2 text-[#E8D7B5]/60">Or,</div>

            <input
              type="text"
              placeholder="Enter zip file URL"
              {...register("zipUrl")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="w-full text-sm sm:text-base"
            />
            {image && image.length > 0 && (
              <p className="text-[#D4AF37] text-sm">{image[0].name}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              {...register("pdf")}
              className="w-full text-sm sm:text-base"
            />
            {pdf && pdf.length > 0 && (
              <p className="text-[#D4AF37] text-sm">{pdf[0].name}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`flex-1 px-4 py-2 sm:py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all text-sm sm:text-base flex justify-center items-center gap-2`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-[#101010]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
