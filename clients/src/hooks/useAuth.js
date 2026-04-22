import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../API/authApi";

const queryKey = "auth";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getCurrentUser,
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      toast.success("Registered successfully 🎉");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Register failed");
    
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: () => {
      toast.success("Login successful ✅");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // 🔥 1. Clear ALL React Query cache
      queryClient.clear();

      // 🔥 2. Clear browser storage
      localStorage.clear();
      sessionStorage.clear();

      // 🔥 3. Remove axios auth header (agar use kar rahe ho)
      delete axios.defaults.headers.common["Authorization"];

      toast.success("Logged out 👋");

      // 🔥 4. Redirect
      window.location.href = "/login";
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
};