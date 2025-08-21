import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = useSelector((s) => s.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
