import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export const useAllJobs = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobListing/get-all-joblistings`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );
      setJobs(response.data.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
  };
};
