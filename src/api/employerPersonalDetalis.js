import api from "./axios";

export const createEmployerPersonalDetails = async (personalData) => {
  try {
    const response = await api.post("/recruiter/personal-detail", personalData);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating employer personal details"
    );
  }
};

export const fetchEmployerPersonalDetails = async () => {
  try {
    const response = await api.get("/recruiter/get-personal-detail");
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while fetching employer personal details"
    );
  }
};

export const updateEmployerPersonalDetails = async ({
  personalDetailsId,
  personalData,
}) => {
  try {
    const response = await api.patch(
      `/recruiter/update-personal-detail/${personalDetailsId}`,
      personalData
    );
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating employer personal details"
    );
  }
};

export const deleteEmployerPersonalDetails = async (personalDetailsId) => {
  try {
    const response = await api.delete(
      `/recruiter/delete-personal-detail/${personalDetailsId}`
    );
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting employer personal details"
    );
  }
};
