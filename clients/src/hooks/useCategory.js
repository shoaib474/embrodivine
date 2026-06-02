import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../API/categoryApi";

// ➕ CREATE CATEGORY
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

// 📥 GET ALL CATEGORIES
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

// 👁 GET SINGLE CATEGORY
export const useSingleCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getSingleCategory(id),
    enabled: !!id,
  });
};

// ✏️ UPDATE CATEGORY
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

// ❌ DELETE CATEGORY
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
