import { useState, useCallback } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { userRole } from "../lib/constants";

export const useJobSeeker = () => {
  const { user, auth } = useAuth();
  const [applications, setApplications] = useState([]);

  const fetchApplications = useCallback(async () => {
    if (user && user?.role === userRole.jobSeeker) {
      try {
        const response = await axios.get(
          `https://lysterpro-backend.onrender.com/api/v1/jobseeker/${user.id}/applications`,
          {
            headers: { Authorization: `Bearer ${auth}` },
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    }
  }, [user, auth]);

  const applyForJob = useCallback(
    async (jobId) => {
      if (user && user?.role === userRole.jobSeeker) {
        try {
          await axios.post(
            `https://lysterpro-backend.onrender.com/api/v1/jobseeker/${user?.id}/applications`,
            { jobId },
            {
              headers: { Authorization: `Bearer ${auth}` },
            }
          );
          await fetchApplications();
        } catch (error) {
          console.error("Failed to apply for job", error);
        }
      }
    },
    [user, auth, fetchApplications]
  );

  return { applications, fetchApplications, applyForJob };
};
