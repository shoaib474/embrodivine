import { Navigate } from "react-router-dom";

import SpinnerLoader from "../components/SpinnerLoader";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <SpinnerLoader/>;

  // agar user logged in nahi hai
  if (!user) return <Navigate to="/auth" replace />;

  // agar adminOnly true hai aur user admin nahi hai
  if (adminOnly && user.role !== "admin") return <Navigate to="/admin/login" replace />;

  // sab kuch thik hai
  return children;
};

export default ProtectedRoute;