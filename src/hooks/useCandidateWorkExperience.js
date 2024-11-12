import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkExperience,
  fetchWorkExperiences,
  updateWorkExperience,
  deleteWorkExperience,
} from "../api/candidateWorkExperience";

export const useCreateWorkExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateWorkExperience"]);
    },
  });
};

export const useFetchWorkExperience = () => {
  return useQuery({
    queryKey: ["candidateWorkExperience"],
    queryFn: fetchWorkExperiences,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdateWorkExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateWorkExperience"]);
    },
  });
};

export const useDeleteWorkExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateWorkExperience"]);
    },
  });
};
