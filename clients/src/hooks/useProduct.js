import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../API/productApi";

import toast from "react-hot-toast";

// 🛍️ GET ALL PRODUCTS
export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],

    queryFn: ({ pageParam = null }) => getProducts({ cursor: pageParam }),

    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },

    staleTime: 1000 * 60 * 5,
  });
};

// 🔍 GET SINGLE PRODUCT
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60 * 5,
  });
};

// ➕ ADD PRODUCT
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      toast.success("Product added ✅");
      queryClient.invalidateQueries(["products"]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add product");
    },
  });
};

export const buildProductFormData = (data) => {
  const formData = new FormData();

  formData.append("name", data.name || "Unnamed Product");
  formData.append("description", data.description || "this is me description");
  formData.append("category", data.category || "General");
  formData.append("badge", data.badge || "Best Seller");
  formData.append("price", parseFloat(data.price) || 0);

  const rating =
    data.rating && !isNaN(parseFloat(data.rating))
      ? parseFloat(data.rating)
      : +(Math.random() * (5.0 - 4.1) + 4.1).toFixed(1);

  formData.append("rating", rating);
  formData.append("productStatus", "active");
  formData.append("dimensions", data.dimensions || '3" x 4"');
  formData.append("colors", parseInt(data.colors) || 0);
  formData.append("zipUrl", data.zipUrl || "");
  formData.append("zip", typeof data.zip === "string" ? data.zip : "");

  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }

  if (data.pdf && data.pdf[0]) {
    formData.append("pdf", data.pdf[0]);
  }

  return formData;
};

// ✏️ UPDATE PRODUCT
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),

    onSuccess: () => {
      toast.success("Product updated ✏️");
      queryClient.invalidateQueries(["products"]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// ❌ DELETE PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      toast.success("Product deleted ❌");
      queryClient.invalidateQueries(["products"]);
    },

    onError: () => {
      toast.error("Delete failed");
    },
  });
};
