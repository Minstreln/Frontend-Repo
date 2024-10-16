import api from "./axios";

export const createResume = async (resumeData) => {
  try {
    const response = await api.post("/jobseeker/resume", resumeData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating the resume"
    );
  }
};

export const fetchResume = async () => {
  try {
    const response = await api.get("/jobseeker/myResume");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "An error occurred while fetching resume"
    );
  }
};

export const updateResume = async ({ resumeId, resumeData }) => {
  try {
    const response = await api.patch(
      `/jobseeker/update-resume/${resumeId}`,
      resumeData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating the resume"
    );
  }
};

export const deleteResume = async (resumeId) => {
  try {
    const response = await api.delete(`/jobseeker/delete-resume/${resumeId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting the resume"
    );
  }
};
