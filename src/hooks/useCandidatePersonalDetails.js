import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPersonalDetails,
  fetchPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
} from "../api/candidatePersonalDetails";

export const useCreatePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};

export const useFetchPersonalDetails = () => {
  return useQuery({
    queryKey: ["candidatePersonalDetails"],
    queryFn: fetchPersonalDetails,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdatePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};

export const useDeletePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidatePersonalDetails"]);
    },
  });
};
