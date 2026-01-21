// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <div className="p-6 text-red-600 font-bold">Access Denied: Insufficient Role</div>;
  }

  // User logged in and has correct role
  return children;
}
