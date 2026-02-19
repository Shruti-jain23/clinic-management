import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // check if user exists in localStorage
  const user = localStorage.getItem("user");

  // if not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if logged in → allow access
  return children;
};

export default ProtectedRoute;
