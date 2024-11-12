import { Trash2 } from "lucide-react";
import {
  useDeleteCompanyDetails,
  useFetchCompanyDetails,
} from "../../../../hooks/useEmployerCompanyDetails";
import Loading from "../../../Loading";
import { Button } from "../../../ui/button";
import CompanyDetailsForm from "./CompanyDetailsForm";
import userImage from "@/assets/user.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EditCompanyDetails from "./EditCompanyDetails";

const CompanyDetails = () => {
  const { data, isLoading, error } = useFetchCompanyDetails();
  const deleteCompanyDetailsMutation = useDeleteCompanyDetails();

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
        Error: {error}
      </div>
    );

  const handleDeleteCompanyDetails = async (id) => {
    try {
      await deleteCompanyDetailsMutation.mutateAsync(id);
      toast.success("Personal details deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting personal details:", error);
    }
  };

  const companyDetails = data.data.companyDetails[0] || {};

  return (
    <div className="w-full">
      {companyDetails && Object.keys(companyDetails).length === 0 ? (
        <CompanyDetailsForm />
      ) : (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-900 text-[16px] font-semibold">
              Company Logo
            </span>
            <img
              src={companyDetails.companyLogo || userImage}
              alt="profile image"
              className="w-80 h-40 object-cover"
            />
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Company Name:
              </span>
              <span className="col-span-2">
                {companyDetails.companyName || "N/A"}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Location:
              </span>
              <span className="col-span-2">
                {companyDetails.location || "N/A"}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Type of Company:
              </span>
              <span className="col-span-2">
                {companyDetails.companyType || "N/A"}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Started In:
              </span>
              <span className="col-span-2">
                {companyDetails.yearOfJoining || "N/A"}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Company Website:
              </span>
              <Link
                className="col-span-2"
                to={companyDetails.companyWebsite}
                target="_blank"
              >
                <span>{companyDetails.companyWebsite || "N/A"}</span>
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-900 text-[16px] font font-semibold">
              About Us
            </span>
            <span>{companyDetails.aboutUs}</span>
          </div>
          <div className="w-full flex flex-row gap-5 items-center justify-end pt-5">
            <Button
              className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
              onClick={() => handleDeleteCompanyDetails(companyDetails._id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <EditCompanyDetails companyDetails={companyDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
