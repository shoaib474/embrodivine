import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useCurrentUser, useLogout } from "../../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const user = data?.user || null;

  const logout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear(); // 🔥 clears dashboard/cart/profile cache
        window.location.href = "/auth"; // redirect after logout
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
