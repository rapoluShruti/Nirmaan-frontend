import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <div className="p-6 text-red-600 font-bold">Access Denied: Insufficient Role</div>;
  }

  return children || <Outlet />;
}
