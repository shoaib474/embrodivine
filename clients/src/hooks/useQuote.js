import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  updateQuoteStatus,
  deleteQuote,
  deleteSelectedQuotes,
} from "../API/quoteApi";

import toast from "react-hot-toast";

const queryKey = "quotes";

export const useQuotes = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getQuotes,
  });
};

export const useQuote = (id) => {
  return useQuery({
    queryKey: ["quote", id],
    queryFn: () => getQuoteById(id),
    enabled: !!id,
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuote,

    onSuccess: () => {
      toast.success("Quote submitted successfully ✅");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit quote");
    },
  });
};

export const useUpdateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateQuote(id, data),

    onSuccess: () => {
      toast.success("Quote updated ✏️");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

export const useUpdateQuoteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateQuoteStatus(id, status),

    onSuccess: () => {
      toast.success("Status updated 🔄");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Status update failed");
    },
  });
};

export const useDeleteQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuote,

    onSuccess: () => {
      toast.success("Quote deleted ❌");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};

export const useDeleteSelectedQuotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSelectedQuotes,

    onSuccess: () => {
      toast.success("Selected quotes deleted 🧹");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Bulk delete failed");
    },
  });
};
