import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployerPersonalDetails,
  fetchEmployerPersonalDetails,
  updateEmployerPersonalDetails,
  deleteEmployerPersonalDetails,
} from "../api/employerPersonalDetalis";

export const useCreateEmployerPersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployerPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerPersonalDetails"]);
    },
  });
};

export const useFetchEmployerPersonalDetails = () => {
  return useQuery({
    queryKey: ["employerPersonalDetails"],
    queryFn: fetchEmployerPersonalDetails,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdateEmployerPersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployerPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerPersonalDetails"]);
    },
  });
};

export const useDeleteEmployerPersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployerPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerPersonalDetails"]);
    },
  });
};
