import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Must be logged in and have admin role
  if (
    !user ||
    user.role !== "admin"
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;