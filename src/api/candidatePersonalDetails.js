import api from "./axios";

export const createPersonalDetails = async (personalData) => {
  try {
    const response = await api.post("/jobseeker/personal-detail", personalData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating personal details"
    );
  }
};

export const fetchPersonalDetails = async () => {
  try {
    const response = await api.get("/jobseeker/get-personal-detail");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while fetching personal details"
    );
  }
};

export const updatePersonalDetails = async ({
  personalDetailsId,
  personalData,
}) => {
  try {
    const response = await api.patch(
      `/jobseeker/update-personal-detail/${personalDetailsId}`,
      personalData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating personal details"
    );
  }
};

export const deletePersonalDetails = async (personalDetailsId) => {
  try {
    const response = await api.delete(
      `/jobseeker/delete-personal-detail/${personalDetailsId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting personal details"
    );
  }
};
