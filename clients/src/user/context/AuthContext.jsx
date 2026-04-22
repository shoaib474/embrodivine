import { createContext, useContext } from "react";

import { useCurrentUser, useLogout } from "../../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  const user = data?.user || null;

  return (
    <AuthContext.Provider value={{ user, logout, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
