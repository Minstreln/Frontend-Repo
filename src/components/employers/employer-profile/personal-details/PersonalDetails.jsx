import { Trash2 } from "lucide-react";
import {
  useDeleteEmployerPersonalDetails,
  useFetchEmployerPersonalDetails,
} from "../../../../hooks/useEmployerPersonalDetails";
import Loading from "../../../Loading";
import { Button } from "../../../ui/button";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { Link } from "react-router-dom";
import userImage from "@/assets/user.png";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import EditPersonalDetails from "./EditPersonalDetails";

const PersonalDetails = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetchEmployerPersonalDetails();
  const deleteEmployerPersonalMutation = useDeleteEmployerPersonalDetails();

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
        Error: {error}
      </div>
    );

  const handleDeletePersonalDetails = async (id) => {
    try {
      await deleteEmployerPersonalMutation.mutateAsync(id);
      toast.success("Personal details deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting personal details:", error);
    }
  };

  const personalDetails = data.data.data.personalDetails[0] || {};

  return (
    <div className="w-full">
      {personalDetails && Object.keys(personalDetails).length === 0 ? (
        <PersonalDetailsForm />
      ) : (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-row items-start justify-between">
            <img
              src={personalDetails.profileImage || userImage}
              alt="profile image"
              className="w-40 h-40 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="w-full flex flex-row gap-5">
              <span className="text-gray-900 text-[16px] font font-semibold">
                First Name:
              </span>
              <span>{user?.firstName}</span>
            </div>
            <div className="w-full flex flex-row gap-5">
              <span className="text-gray-900 text-[16px] font font-semibold">
                Middle Name:
              </span>
              <span>{personalDetails?.middleName || "N/A"}</span>
            </div>
            <div className="w-full flex flex-row gap-5">
              <span className="text-gray-900 text-[16px] font font-semibold">
                Last Name:
              </span>
              <span>{user?.lastName}</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Location:
              </span>
              <span className="col-span-2">{personalDetails?.location}</span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Phone Number:
              </span>
              <span className="col-span-2">
                {personalDetails?.phoneNumber || "N/A"}
              </span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Linked Profile:
              </span>
              <Link
                className="col-span-2"
                to={personalDetails?.linkedin}
                target="_blank"
              >
                <span>{personalDetails?.linkedin || "N/A"}</span>
              </Link>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                GitHub:
              </span>
              <Link
                className="col-span-2"
                to={personalDetails?.github}
                target="_blank"
              >
                <span>{personalDetails?.github || "N/A"}</span>
              </Link>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
              <span className="text-gray-900 text-[16px] font-semibold col-span-1">
                Portifolio Site:
              </span>
              <Link
                className="col-span-2"
                to={personalDetails?.portfolioSite}
                target="_blank"
              >
                <span>{personalDetails?.portfolioSite || "N/A"}</span>
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-row gap-5 items-center justify-end pt-5">
            <Button
              className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
              onClick={() => handleDeletePersonalDetails(personalDetails._id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <EditPersonalDetails personalDetails={personalDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
