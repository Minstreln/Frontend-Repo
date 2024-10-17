/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-6">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/signin" state={{ path: location.pathname }} replace />
    );
  }

  return children;
};

export default ProtectedRoutes;
