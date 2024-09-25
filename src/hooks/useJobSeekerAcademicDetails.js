import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import toast from "react-hot-toast";

export const useJobSeekerAcademicDetails = () => {
  const { auth } = useAuth();
  const [academicDetails, setAcademicDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAcademicDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/get-academic-detail`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setAcademicDetails(response.data.data.academicDetails);
      } else {
        throw new Error("Failed to fetch academic details");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch academic details"
      );
      console.error("Failed to fetch academic details", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const deleteAcademicDetail = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.delete(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/delete-academic-detail/${id}`,
          {
            headers: auth ? { Authorization: `Bearer ${auth}` } : {},
          }
        );

        if (response.status === 204) {
          toast.success("Academic detail deleted successfully");
          fetchAcademicDetails();
        } else {
          throw new Error("Failed to delete academic detail");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to delete academic detail"
        );
        console.error("Failed to delete academic detail", err);
      } finally {
        setLoading(false);
      }
    },
    [auth, fetchAcademicDetails]
  );

  useEffect(() => {
    fetchAcademicDetails();
  }, [fetchAcademicDetails]);

  return {
    academicDetails,
    loading,
    error,
    deleteAcademicDetail,
    refetch: fetchAcademicDetails,
  };
};
