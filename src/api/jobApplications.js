import api from "./axios";

export const applyToJob = async (jobId, applicationData) => {
  try {
    const response = await api.post(`/applications/create`, applicationData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while applying to the job"
    );
  }
};
