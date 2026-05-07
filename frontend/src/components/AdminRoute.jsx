import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  // If no user OR not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;