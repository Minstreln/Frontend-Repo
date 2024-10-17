/* eslint-disable react/prop-types */
import { createContext } from "react";
import useAuth from "../../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContext;
