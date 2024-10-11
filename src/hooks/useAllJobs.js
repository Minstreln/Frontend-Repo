import { useQuery } from "@tanstack/react-query";
import { fetchAllJobs } from "../api/fetchAllJobs";

export const useAllJobs = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all-jobs"],
    queryFn: fetchAllJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
  return {
    data,
    isLoading,
    error: error ? error.message || "An error occurred" : null,
    refetch,
  };
};
