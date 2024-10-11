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
    staleTime: 5 * 60 * 1000, // 5 minutes
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
