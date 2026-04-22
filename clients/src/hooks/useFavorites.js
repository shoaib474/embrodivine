import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFavorites,
  toggleFavorite,
  clearFavorites,
} from "../API/favoriteApi";
import toast from "react-hot-toast";

// ❤️ GET FAVORITES
export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
};

// 🔄 TOGGLE FAVORITE (MAIN FIX)
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,

    // ⚡ Optimistic update (smooth UX)
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["favorites"]);

      const previousFavorites = queryClient.getQueryData(["favorites"]);

      queryClient.setQueryData(["favorites"], (old) => {
        if (!old) return old;

        const exists = old.favorites?.some((f) => f.product._id === productId);

        return {
          ...old,
          favorites: exists
            ? old.favorites.filter((f) => f.product._id !== productId)
            : [...old.favorites, { product: { _id: productId } }],
        };
      });

      return { previousFavorites };
    },

    onError: (err, productId, context) => {
      queryClient.setQueryData(["favorites"], context.previousFavorites);
      toast.error(err?.response?.data?.message || "Toggle failed");
    },

    onSuccess: () => {
      toast.success("Updated favorites ❤️");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });
};

// 🧹 CLEAR FAVORITES
export const useClearFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearFavorites,

    onSuccess: () => {
      toast.success("Favorites cleared 🧹");
      queryClient.invalidateQueries(["favorites"]);
    },

    onError: () => {
      toast.error("Failed to clear favorites");
    },
  });
};
