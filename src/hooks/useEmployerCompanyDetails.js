import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompanyDetails,
  fetchCompanyDetails,
  updateCompanyDetails,
  deleteCompanyDetails,
} from "../api/employerCompanyDetails";

export const useCreateCompanyDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompanyDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerCompanyDetails"]);
    },
  });
};

export const useFetchCompanyDetails = () => {
  return useQuery({
    queryKey: ["employerCompanyDetails"],
    queryFn: fetchCompanyDetails,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdateCompanyDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerCompanyDetails"]);
    },
  });
};

export const useDeleteCompanyDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompanyDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["employerCompanyDetails"]);
    },
  });
};
