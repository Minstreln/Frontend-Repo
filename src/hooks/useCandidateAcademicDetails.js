import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAcademicDetail,
  fetchAcademicDetails,
  updateAcademicDetail,
  deleteAcademicDetail,
} from "../api/candidateAcademicDetails";

export const useCreateAcademicDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAcademicDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateAcademicDetails"]);
    },
  });
};

export const useFetchAcademicDetails = () => {
  return useQuery({
    queryKey: ["candidateAcademicDetails"],
    queryFn: fetchAcademicDetails,
    staleTime: 1000 * 60 * 60 * 24, // Set stale time to 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useUpdateAcademicDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAcademicDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateAcademicDetails"]);
    },
  });
};

export const useDeleteAcademicDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAcademicDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateAcademicDetails"]);
    },
  });
};
