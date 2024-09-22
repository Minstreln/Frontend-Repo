/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);


  // Register function
  const register = async (values, opt) => {
    if (opt) {
      try {
        const res = await axios.post(
          "https://lysterpro-backend.onrender.com/api/v1/jobseeker/signup",
          values
        );

        // After registration, store the token
        setAuth(res.data.token);
        localStorage.setItem("token", res.data.token);

        return res.data;
      } catch (err) {
        throw new Error(err.response.data.message || "Registration failed");
      }
    } else if (opt == false) {
      try {
        const res = await axios.post(
          "https://lysterpro-backend.onrender.com/api/v1/recruiter/signup",
          values
        );

        // After registration, store the token
        setAuth(res.data.token);
        localStorage.setItem("token", res.data.token);

        return res.data;
      } catch (err) {
        throw new Error(err.response.data.message || "Registration failed");
      }
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

      setUser(res.data.role)
      localStorage.setItem("role", res.data.role);

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

      // // After login, store the token
      // setAuth(res.data.token);
      // localStorage.setItem('token', res.data.token);

      // return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Reset failed");
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(token);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setUser(role);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth,user, register, login, forgotPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
