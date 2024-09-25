import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export const useJobSeekerWorkExperience = () => {
  const { auth } = useAuth();
  const [workExperience, setWorkExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkExperience = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/get-work-experience`,
        {
          headers: auth ? { Authorization: `Bearer ${auth}` } : {},
        }
      );

      if (response.data.status === "success") {
        setWorkExperience(response.data.data.workExperience);
        console.log(response.data.data.workExperience);
      } else {
        throw new Error("Failed to fetch work experience");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch work experience"
      );
      console.error("Failed to fetch work experience", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const editWorkExperience = useCallback(
    async (id, updatedData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.put(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/update-work-experience/${id}`,
          updatedData,
          {
            headers: auth ? { Authorization: `Bearer ${auth}` } : {},
          }
        );

        if (response.data.status === "success") {
          setWorkExperience((prevExperience) =>
            prevExperience.map((exp) =>
              exp.id === id ? { ...exp, ...updatedData } : exp
            )
          );
          console.log("Work experience updated successfully");
        } else {
          throw new Error("Failed to update work experience");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to update work experience"
        );
        console.error("Failed to update work experience", err);
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  const deleteWorkExperience = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.delete(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/delete-work-experience/${id}`,
          {
            headers: auth ? { Authorization: `Bearer ${auth}` } : {},
          }
        );

        if (response.data.status === "success") {
          setWorkExperience((prevExperience) =>
            prevExperience.filter((exp) => exp.id !== id)
          );
          console.log("Work experience deleted successfully");
        } else {
          throw new Error("Failed to delete work experience");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to delete work experience"
        );
        console.error("Failed to delete work experience", err);
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  useEffect(() => {
    fetchWorkExperience();
  }, [fetchWorkExperience]);

  return {
    workExperience,
    loading,
    error,
    refetch: fetchWorkExperience,
    editWorkExperience,
    deleteWorkExperience,
  };
};
