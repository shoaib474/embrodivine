import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createOrder,
  captureOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../API/orderApi";

const queryKey = "orders";

// # 📦 1. CREATE ORDER
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      toast.success("Order created 🎉");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Order creation failed");
    },
  });
};

// # 💳 2. CAPTURE ORDER (PayPal)
export const useCaptureOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureOrder,

    onSuccess: () => {
      toast.success("Payment successful 💳");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Payment failed");
    },
  });
};

// # 📄 3. MY ORDERS
export const useMyOrders = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getMyOrders,
    staleTime: 1000 * 60 * 5,
  });
};

// # 🔍 4. SINGLE ORDER
export const useOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

// # 🛠️ 5. ADMIN: ALL ORDERS
export const useAllOrders = (params) => {
  return useQuery({
    queryKey: ["orders", "admin", params],
    queryFn: () => getAllOrders(params),
  });
};

// # ✏️ 6. UPDATE ORDER STATUS
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: () => {
      toast.success("Order status updated ✅");
      queryClient.invalidateQueries([queryKey]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

// # ❌ 7. DELETE ORDER
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,

    onSuccess: () => {
      toast.success("Order deleted 🗑️");
      queryClient.invalidateQueries(["orders"]);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};
