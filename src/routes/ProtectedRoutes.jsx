import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("Auth status:", isAuthenticated);
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div className="wrapper text-gray-600 text-lg py-8">Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
