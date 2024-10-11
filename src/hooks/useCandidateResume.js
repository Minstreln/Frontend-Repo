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
    staleTime: 5 * 60 * 1000, // 5 minutes
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
