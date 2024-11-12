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

// fetch applied jobs(candidate)
export const fetchAppliedJobs = async () => {
  try {
    const response = await api.get("/applications");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch applied jobs: ", error);
    return error.response?.data?.message || "Failed to fetch applied jobs";
  }
};

// apply for a job(candidate)
export const applyForJob = async (applicationData) => {
  try {
    const response = await api.post(`/applications/create`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Failed to apply for job: ", error);
    return error.response?.data?.message || "Failed to apply for job";
  }
};

// save a job(candidate)
export const saveJob = async (jobId) => {
  try {
    const response = await api.post(`/jobseeker/save-job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to save job: ", error);
    return error.response?.data?.message || "Failed to save job";
  }
};

// fetch saved jobs(candidate)
export const fetchSavedJobs = async () => {
  try {
    const response = await api.get("/jobseeker/saved-jobs");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saved jobs: ", error);
    return error.response?.data?.message || "Failed to fetch saved jobs";
  }
};

// fetch recruiter open jobs(recruiter)
export const fetchRecruiterOpenJobs = async () => {
  try {
    const response = await api.get("/recruiter/open-jobs");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recruiter open jobs: ", error);
    return (
      error.response?.data?.message || "Failed to fetch recruiter open jobs"
    );
  }
};

// fetch recruiter jobs(recruiter)
export const fetchRecruiterJobs = async () => {
  try {
    const response = await api.get("/jobListing/my-joblisting");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recruiter jobs: ", error);
    return error.response?.data?.message || "Failed to fetch recruiter jobs";
  }
};

// post a job(recruiter)
export const postJob = async (jobData) => {
  try {
    const response = await api.post("/jobListing/add-joblisting", jobData);
    return response.data;
  } catch (error) {
    console.error("Failed to post job: ", error);
    return error.response?.data?.message || "Failed to post job";
  }
};

// job applications(recruiter)
export const jobApplications = async (applicationData) => {
  try {
    const response = await api.post("/applications/create", applicationData);
    return response.data;
  } catch (error) {
    console.error("Failed to post job: ", error);
    return error.response?.data?.message || "Failed to post job";
  }
};
