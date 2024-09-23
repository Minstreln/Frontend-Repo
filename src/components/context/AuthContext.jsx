/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  // Register function
  const register = async (values, isJobSeeker) => {
    const url = isJobSeeker
      ? "https://lysterpro-backend.onrender.com/api/v1/jobseeker/signup"
      : "https://lysterpro-backend.onrender.com/api/v1/recruiter/signup";

    try {
      const res = await axios.post(url, values);

      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://lysterpro-backend.onrender.com/api/v1/auth/signin",
        { email, password }
      );

      // After login, store the token
      setAuth(res.data.token);
      localStorage.setItem("token", res.data.token);

      // Set the full user object
      setUser(res.data.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Login failed");
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(
        "https://lysterpro-backend.onrender.com/api/v1/jobseeker/forgot-password",
        { email }
      );
    } catch (err) {
      throw new Error(err.response.data.message || "Reset failed");
    }
  };

  const logout = () => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token) setAuth(token);
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, user, register, login, forgotPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
