import { useState, useCallback } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { userRole } from "../lib/constants";

export const useEmployer = () => {
  const { user, auth } = useAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    if (user && user?.role === userRole.employer) {
      try {
        const response = await axios.get(
          `https://lysterpro-backend.onrender.com/api/v1/recruiter/${user?.id}/jobs`,
          {
            headers: { Authorization: `Bearer ${auth}` },
          }
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    }
  }, [user, auth]);

  const createJob = useCallback(
    async (jobData) => {
      if (user && user?.role === userRole.employer) {
        try {
          await axios.post(
            `https://lysterpro-backend.onrender.com/api/v1/recruiter/${user?.id}/jobs`,
            jobData,
            {
              headers: { Authorization: `Bearer ${auth}` },
            }
          );
          await fetchJobs();
        } catch (error) {
          console.error("Failed to create job", error);
        }
      }
    },
    [user, auth, fetchJobs]
  );

  const updateJob = useCallback(
    async (jobId, jobData) => {
      if (user && user?.role === userRole.employer) {
        try {
          await axios.put(
            `https://lysterpro-backend.onrender.com/api/v1/recruiter/${user?.id}/jobs/${jobId}`,
            jobData,
            {
              headers: { Authorization: `Bearer ${auth}` },
            }
          );
          await fetchJobs();
        } catch (error) {
          console.error("Failed to update job", error);
        }
      }
    },
    [user, auth, fetchJobs]
  );

  const deleteJob = useCallback(
    async (jobId) => {
      if (user && user?.role === userRole.employer) {
        try {
          await axios.delete(
            `https://lysterpro-backend.onrender.com/api/v1/recruiter/${user?.id}/jobs/${jobId}`,
            {
              headers: { Authorization: `Bearer ${auth}` },
            }
          );
          await fetchJobs();
        } catch (error) {
          console.error("Failed to delete job", error);
        }
      }
    },
    [user, auth, fetchJobs]
  );

  return { jobs, fetchJobs, createJob, updateJob, deleteJob };
};
