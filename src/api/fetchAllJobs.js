import api from "./axios";

export const fetchAllJobs = async () => {
  try {
    const response = await api.get("/jobListing/get-all-joblistings");
    return response.data.data.data;
  } catch (error) {
    console.error("Failed to fetch all jobs: ", error);
    return error.response?.data?.message || "Failed to fetch all jobs";
  }
};
