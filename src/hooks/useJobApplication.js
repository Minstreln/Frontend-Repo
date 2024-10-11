import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToJob } from "../api/jobApplications";

export const useJobApplication = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ jobId, applicationData }) =>
      applyToJob(jobId, applicationData),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["userApplications"]);
    },
  });

  return {
    applyToJob: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
