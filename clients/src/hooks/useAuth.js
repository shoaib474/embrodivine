import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
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
  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      toast.success("Registration successful ✅");
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

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: () => {
      toast.success("Reset link sent to your email 📩");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to send reset link",
      );
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      toast.success("Password reset successful 🔐");

      // redirect to login
      window.location.replace("/auth");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Password reset failed");
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,

    onSuccess: () => {
      toast.success("Email verified successfully 🎉");

      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 1500);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Email verification failed",
      );
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,

    onSuccess: () => {
      toast.success("Password updated successfully. Please login again 🔐");

      // Clear React Query cache
      queryClient.clear();

      // Clear Browser Storage
      localStorage.clear();
      sessionStorage.clear();

      // Remove Authorization Header
      delete axios.defaults.headers.common["Authorization"];

      // Redirect to Login
      setTimeout(() => {
        window.location.replace("/auth");
      }, 1200);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    },
  });
};
