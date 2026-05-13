import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileText, X } from "lucide-react";
import { Link } from "react-router-dom";

import { useUpdateProduct } from "../../hooks/useProduct";

const EditProductModal = ({ setShowEditModal, product }) => {
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ...product,
    },
  });

  const [imagePreview, setImagePreview] = useState(product.image?.url || "");
  const [pdfPreview, setPdfPreview] = useState(product.pdf?.url || "");

  useEffect(() => {
    return () => {
      if (pdfPreview) {
        URL.revokeObjectURL(pdfPreview);
      }
    };
  }, [pdfPreview]);

  useEffect(() => {
    // Reset form whenever a new product is passed
    reset({
      ...product,
    });
    setImagePreview(product.image?.url || "");
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        // Image
        if (key === "image" && value?.[0] instanceof File) {
          formData.append("image", value[0]);
          return;
        }

        // PDF
        if (key === "pdf" && value?.[0] instanceof File) {
          formData.append("pdf", value[0]);
          return;
        }

        // Numbers
        if (key === "price" || key === "rating" || key === "colors") {
          const num = Number(value);
          if (!isNaN(num)) {
            formData.append(key, num);
          }
          return;
        }

        // Everything else → STRING
        formData.append(key, String(value));
      });

      updateProduct(
        { id: product._id, data: formData },
        {
          onSuccess: () => {
            setShowEditModal(false);
          },
        },
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8 max-w-md w-full animate-scale-in max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
            Edit Product
          </h2>
          <button
            onClick={() => setShowEditModal(false)}
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
              className="w-full h-40 col px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base resize-none hide-scrollbar"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] capitalize text-sm sm:text-base"
              type="text"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price must be positive</p>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Colors
            </label>
            <input
              {...register("colors")}
              type="number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="e.g. 3 (number of colors)"
            />
          </div>

          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Dimensions
            </label>
            <input
              {...register("dimensions")}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
              placeholder="e.g. 3 x 4 inches"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Embroidery Files (ZIP)
            </label>
            <input
              type="file"
              accept=".zip"
              {...register("zip")}
              className="w-full text-sm sm:text-base"
            />

            <div>
              <span className="text-[#E8D7B5]/60 text-sm">
                or, provide a ZIP file URL:
              </span>
              <input
                type="text"
                {...register("zipUrl")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base mt-2"
                placeholder="https://example.com/file.zip"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm sm:text-base"
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {imagePreview && (
              <img
                src={imagePreview}
                loading="lazy"
                alt="Preview"
                className="w-24 h-24 mt-2 object-cover rounded-lg"
              />
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm sm:text-base">
              PDF
            </label>

            <input
              type="file"
              accept="application/pdf"
              className="w-full text-sm sm:text-base"
              {...register("pdf", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPdfPreview(URL.createObjectURL(file));
                  }
                },
              })}
            />

            {pdfPreview && (
              <div className="flex items-center gap-3 mt-3 p-3 border rounded-lg bg-[#ffffff08]">
                <FileText className="w-10 h-10 text-red-600" />

                <div>
                  <p className="text-sm font-medium text-white">
                    {product?.name || "Selected File"} – PDF
                  </p>

                  <Link
                    to={pdfPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs underline"
                  >
                    Preview PDF
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isPending}
              className={`flex-1 px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all flex items-center justify-center
    ${
      !isDirty || isPending
        ? "bg-gray-500 cursor-not-allowed text-gray-300"
        : "bg-[#D4AF37] text-[#101010] hover:bg-[#E8D7B5]"
    }`}
            >
              {isPending ? (
                <span className="flex items-center gap-2">Updating...</span>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
