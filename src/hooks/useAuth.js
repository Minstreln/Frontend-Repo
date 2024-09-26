import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, [context.auth]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { ...context, isAuthenticated, loading };
};

export default useAuth;
