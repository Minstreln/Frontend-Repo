import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPersonalDetails,
  fetchPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
} from "../api/candidatePersonalDetails";

export const useCreatePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};

export const useFetchPersonalDetails = () => {
  return useQuery({
    queryKey: ["candidatePersonalDetails"],
    queryFn: fetchPersonalDetails,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdatePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};

export const useDeletePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};
