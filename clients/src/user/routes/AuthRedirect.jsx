import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If logged in
  if (user) {
    // Admin redirect
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      // Normal user redirect
      return <Navigate to="/dashboard" replace />;
    }
  }
  // If not logged in, show page (login/register)
  return children;
};

export default AuthRedirect;
