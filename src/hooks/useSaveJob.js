import { useState, useCallback } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export const useSaveJob = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveJob = useCallback(
    async (jobId) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await axios.post(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/save-job/${jobId}`,
          {},
          {
            headers: auth ? { Authorization: `Bearer ${auth}` } : {},
          }
        );

        if (response.data.status === "success") {
          setSuccess(true);
        } else {
          throw new Error("Failed to save job");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to save job");
        console.error("Failed to save job", err);
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  return {
    saveJob,
    loading,
    error,
    success,
  };
};
