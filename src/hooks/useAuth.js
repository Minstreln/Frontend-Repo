import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { ...context, isAuthenticated };
};

export default useAuth;
