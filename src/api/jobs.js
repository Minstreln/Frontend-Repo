import api from "./axios";

// fetch all jobs
export const fetchAllJobs = async () => {
  try {
    const response = await api.get("/jobListing/get-all-joblistings");
    return response.data.data.data;
  } catch (error) {
    console.error("Failed to fetch all jobs: ", error);
    return error.response?.data?.message || "Failed to fetch all jobs";
  }
};

// fetch job by id
export const fetchJobById = async (id) => {
  try {
    const response = await api.get(`/jobListing/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.error("Failed to fetch job: ", error);
    return error.response?.data?.message || "Failed to fetch job";
  }
};

// fetch applied jobs
export const fetchAppliedJobs = async () => {
  try {
    const response = await api.get("/applications");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch applied jobs: ", error);
    return error.response?.data?.message || "Failed to fetch applied jobs";
  }
};

// apply for a job
export const applyForJob = async (applicationData) => {
  try {
    const response = await api.post(`/applications/create`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Failed to apply for job: ", error);
    return error.response?.data?.message || "Failed to apply for job";
  }
};

// save a job
export const saveJob = async (jobId) => {
  try {
    const response = await api.post(`/jobseeker/save-job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to save job: ", error);
    return error.response?.data?.message || "Failed to save job";
  }
};

// fetch saved jobs
export const fetchSavedJobs = async () => {
  try {
    const response = await api.get("/jobseeker/saved-jobs");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saved jobs: ", error);
    return error.response?.data?.message || "Failed to fetch saved jobs";
  }
};
