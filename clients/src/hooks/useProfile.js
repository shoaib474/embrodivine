import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../API/profileApi";
import { useNavigate } from "react-router-dom";

const queryKey = "profile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getUserProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,

    onSuccess: () => {
      toast.success("Profile updated successfully ✅");

      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });
};

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUserAccount,

    onSuccess: () => {
      toast.success("Account deleted successfully ✅");

      // Clear all cache (important)
      queryClient.clear();

      // Redirect to login page
      navigate("/auth");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    },
  });
};
