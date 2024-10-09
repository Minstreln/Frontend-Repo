import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import toast from "react-hot-toast";

export const useJobSeekerResume = () => {
  const { auth } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/myResume`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setResumes(response.data.data.userResume);
      } else {
        throw new Error("Failed to fetch resume");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch resume");
      console.error("Failed to fetch work experience", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const deleteResume = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.delete(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/delete-resume/${id}`,
          {
            headers: auth ? { Authorization: `Bearer ${auth}` } : {},
          }
        );

        if (response.status === 204) {
          toast.success("Resume deleted successfully");
          fetchResumes();
        } else {
          throw new Error("Failed to delete resume");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete resume");
        console.error("Failed to delete resume", err);
      } finally {
        setLoading(false);
      }
    },
    [auth, fetchResumes]
  );

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return {
    resumes,
    loading,
    error,
    refetch: fetchResumes,
    deleteResume,
  };
};
