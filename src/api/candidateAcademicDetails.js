import api from "./axios";

export const createAcademicDetail = async (academicData) => {
  try {
    const response = await api.post("/jobseeker/academic-detail", academicData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while creating academic detail"
    );
  }
};

export const fetchAcademicDetails = async () => {
  try {
    const response = await api.get("/jobseeker/get-academic-detail");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while fetching academic details"
    );
  }
};

export const updateAcademicDetail = async ({
  academicDetailId,
  academicDetailData,
}) => {
  try {
    const response = await api.patch(
      `/jobseeker/update-academic-detail/${academicDetailId}`,
      academicDetailData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while updating academic DetailDatail"
    );
  }
};

export const deleteAcademicDetail = async (academicDetailId) => {
  try {
    const response = await api.delete(
      `/jobseeker/delete-academic-detail/${academicDetailId}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "An error occurred while deleting the resume"
    );
  }
};
