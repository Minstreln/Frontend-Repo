import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createResume,
  fetchResume,
  updateResume,
  deleteResume,
} from "../api/candidateResumes";

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResume,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateResume"]);
    },
  });
};

export const useFetchResume = () => {
  return useQuery({
    queryKey: ["candidateResume"],
    queryFn: fetchResume,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResume,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateResume"]);
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateResume"]);
    },
  });
};
