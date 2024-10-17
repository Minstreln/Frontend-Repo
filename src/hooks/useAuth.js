import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios"; // Import the axios instance

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (token && storedUser) {
        return storedUser;
      }
      return null;
    },
    retry: false,
  });

  const register = useMutation({
    mutationFn: async (values, isJobSeeker) => {
      const url = isJobSeeker ? "/jobseeker/signup" : "/recruiter/signup";
      const response = await api.post(url, values);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const login = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await api.post("/auth/signin", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.setQueryData(["user"], data.data.user);
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (email) => {
      await api.post("/jobseeker/forgot-password", { email });
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.setQueryData(["user"], null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    register,
    login,
    forgotPassword,
    logout,
  };
};

export default useAuth;
