import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../API/authApi";

// GET CURRENT USER
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

// REGISTER
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: async () => {
      toast.success("Registered successfully 🎉");

      // 🔥 immediately refetch current user
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Register failed");
    },
  });
};

// LOGIN
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      toast.success("Login successful ✅");

      // wait so cookie properly register ho
      await new Promise((resolve) => setTimeout(resolve, 150));

      // force fresh user fetch
      await queryClient.refetchQueries({
        queryKey: ["currentUser"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      // redirect
      window.location.replace("/dashboard");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

// LOGOUT
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // Clear all cache
      queryClient.clear();

      // Clear storage
      localStorage.clear();
      sessionStorage.clear();

      // Remove auth header
      delete axios.defaults.headers.common["Authorization"];

      toast.success("Logged out 👋");

      // Redirect
      window.location.replace("/auth");
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
};
