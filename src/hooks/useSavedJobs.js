import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export const useSavedJobs = () => {
  const { auth } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numberOfSavedJobs, setNumberOfSavedJobs] = useState(0);

  const fetchSavedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/saved-jobs`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setSavedJobs(response.data.data.savedJobs);
        setNumberOfSavedJobs(response.data.results);
      } else {
        throw new Error("Failed to fetch saved jobs");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch saved jobs");
      console.error("Failed to fetch saved jobs", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return {
    savedJobs,
    loading,
    error,
    numberOfSavedJobs,
    refetch: fetchSavedJobs,
  };
};
