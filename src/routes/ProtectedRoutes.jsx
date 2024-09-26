/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-6">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoutes;
