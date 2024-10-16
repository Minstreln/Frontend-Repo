import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllJobs,
  fetchJobById,
  fetchAppliedJobs,
  fetchSavedJobs,
  applyForJob,
  saveJob,
} from "../api/jobs";

export const useFetchAllJobs = () => {
  return useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchAllJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFetchJobById = (id) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFetchAppliedJobs = () => {
  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFetchSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useApplyForJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyForJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedJobs"]);
    },
  });
};

export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]);
    },
  });
};
