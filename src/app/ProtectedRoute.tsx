import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../features/auth/services/auth.service";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
