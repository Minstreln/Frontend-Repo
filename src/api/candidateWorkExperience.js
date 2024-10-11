import api from "./axios";

export const createWorkExperience = async (workExperienceData) => {
  try {
    const response = await api.post(
      "/jobseeker/experience",
      workExperienceData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating the work experience"
    );
  }
};

export const fetchWorkExperiences = async () => {
  try {
    const response = await api.get("/jobseeker/get-experience-detail");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while fetching work experiences"
    );
  }
};

export const updateWorkExperience = async ({
  workExperienceId,
  workExperienceData,
}) => {
  try {
    const response = await api.patch(
      `/jobseeker/update-experience-detail/${workExperienceId}`,
      workExperienceData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating the work experience"
    );
  }
};

export const deleteWorkExperience = async (workExperienceId) => {
  try {
    const response = await api.delete(
      `/jobseeker/delete-experience-detail/${workExperienceId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting the work experience"
    );
  }
};
