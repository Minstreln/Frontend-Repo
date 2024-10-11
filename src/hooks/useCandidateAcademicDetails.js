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
    staleTime: 5 * 60 * 1000, // 5 minutes
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
