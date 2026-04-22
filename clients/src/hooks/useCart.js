import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getSavedItems,
  saveForLater,
  moveToCart,
  removeSavedItem,
} from "../API/cartApi";

// GET CART
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
  });
};

// ADD TO CART
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success("Added to cart 🛒");
      queryClient.invalidateQueries(["cart"]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    },
  });
};

// UPDATE ITEM
export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCartItem(id, data),
    onSuccess: () => {
      toast.success("Cart updated 🔄");
      queryClient.invalidateQueries(["cart"]);
    },

    onError: () => {
      toast.error("Update failed");
    },
  });
};

// REMOVE ITEM
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      toast.success("Item removed ❌");
      queryClient.invalidateQueries(["cart"]);
    },

    onError: () => {
      toast.error("Failed to remove item");
    },
  });
};

// CLEAR CART
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },

    onError: () => {
      toast.error("Failed to clear cart");
    },
  });
};

// GET saved items for later
export const useSavedItems = () => {
  return useQuery({
    queryKey: ["savedItems"],
    queryFn: getSavedItems,
    staleTime: 1000 * 60 * 5,
  });
};

// SAVE for later
export const useSaveForLater = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveForLater,
    onSuccess: () => {
      toast.success("Item saved for later 🕒");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to save item");
    },
  });
};

// MOVE to cart from save for later
export const useMoveToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveToCart,
    onSuccess: () => {
      toast.success("Item moved to cart 🛒");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to move item");
    },
  });
};

// DELETE saved item
export const useRemoveSavedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSavedItem,
    onSuccess: () => {
      toast.success("Saved item removed ❌");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to remove saved item");
    },
  });
};
