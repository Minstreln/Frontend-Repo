import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

export const useAppliedJobs = () => {
  const { auth } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numberOfAppliedJobs, setNumberOfAppliedJobs] = useState(0);

  const fetchAppliedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/applications`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setAppliedJobs(response.data.data.applications);
        setNumberOfAppliedJobs(response.data.results);
      } else {
        throw new Error("Failed to fetch job applications");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch job applications"
      );
      console.error("Failed to fetch job applications", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  return {
    appliedJobs,
    loading,
    error,
    numberOfAppliedJobs,
    refetch: fetchAppliedJobs,
  };
};
