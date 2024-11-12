import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllJobs,
  fetchJobById,
  fetchAppliedJobs,
  fetchSavedJobs,
  applyForJob,
  saveJob,
  postJob,
  fetchRecruiterOpenJobs,
  fetchRecruiterJobs,
} from "../api/jobs";

// fetch all jobs
export const useFetchAllJobs = () => {
  return useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchAllJobs,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// fetch job by id
export const useFetchJobById = (id) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// fetch applied jobs(candidate)
export const useFetchAppliedJobs = () => {
  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// fetch saved jobs(candidate)
export const useFetchSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// Apply For Job Mutation(candidate)
export const useApplyForJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyForJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedJobs"]);
    },
  });
};

// Save Job Mutation(candidate)
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]);
    },
  });
};

// fetch recruiter open jobs(recruiter)
export const useFetchRecruiterOpenJobs = () => {
  return useQuery({
    queryKey: ["recruiterOpenJobs"],
    queryFn: fetchRecruiterOpenJobs,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// fetch recruiter jobs(recruiter)
export const useFetchRecruiterJobs = () => {
  return useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: fetchRecruiterJobs,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// post job mutation(recruiter)
export const usePostJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["recruiterOpenJobs", "recruiterJobs"]);
    },
  });
};
