import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export const useJobSeekerPersonalDetails = () => {
  const { auth } = useAuth();
  const [personalDetails, setPersonalDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPersonalDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/get-personal-detail`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setPersonalDetails(response.data.data.personalDetails);
      } else {
        throw new Error("Failed to fetch personal details");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch personal details"
      );
      console.error("Failed to fetch personal details", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);

  return {
    personalDetails,
    loading,
    error,
    refetch: fetchPersonalDetails,
  };
};
