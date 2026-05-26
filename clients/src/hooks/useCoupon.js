import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCoupon,
  getCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../API/couponApi";

// ➕ CREATE COUPON
export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
  });
};

// 📥 GET ALL COUPONS
export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
  });
};

// 👁 GET SINGLE COUPON
export const useSingleCoupon = (id) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getSingleCoupon(id),
    enabled: !!id,
  });
};

// ✏️ UPDATE COUPON
export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
  });
};

// ❌ DELETE COUPON
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });
    },
  });
};

// 🎟 VALIDATE / APPLY COUPON
export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: validateCoupon,
  });
};
