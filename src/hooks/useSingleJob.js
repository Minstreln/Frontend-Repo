import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export const useSingleJob = (jobId) => {
  const { auth } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJob = useCallback(async () => {
    if (!jobId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobListing/${jobId}`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );
      setJob(response.data.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job");
      console.error("Failed to fetch job", err);
    } finally {
      setLoading(false);
    }
  }, [auth, jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return {
    job,
    loading,
    error,
    refetch: fetchJob,
  };
};
