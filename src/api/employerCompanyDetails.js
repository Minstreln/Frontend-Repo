import api from "./axios";

export const createCompanyDetails = async (companyData) => {
  try {
    const response = await api.post("/recruiter/company-detail", companyData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating company details"
    );
  }
};

export const fetchCompanyDetails = async () => {
  try {
    const response = await api.get("/recruiter/get-company-detail");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while fetching company details"
    );
  }
};

export const updateCompanyDetails = async ({
  companyDetailsId,
  companyData,
}) => {
  try {
    const response = await api.patch(
      `/recruiter/update-company-detail/${companyDetailsId}`,
      companyData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating company details"
    );
  }
};

export const deleteCompanyDetails = async (companyDetailsId) => {
  try {
    const response = await api.delete(
      `/recruiter/delete-company-detail/${companyDetailsId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting company details"
    );
  }
};
