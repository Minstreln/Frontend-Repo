import userImage from "@/assets/user.png";
import useAuth from "../../../../hooks/useAuth";
import EditPersonalDetails from "./EditPersonalDetails";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
import {
  useDeletePersonalDetails,
  useFetchPersonalDetails,
} from "../../../../hooks/useCandidatePersonalDetails";
import Loading from "../../../Loading";
import { Trash2 } from "lucide-react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import toast from "react-hot-toast";
const PersonalDetails = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetchPersonalDetails();
  const deletePersonalDetailsMutation = useDeletePersonalDetails();

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <div className="w-full">
        {error === "No personal details found for this user." ? (
          <div className="w-full">
            <PersonalDetailsForm />
          </div>
        ) : (
          <div className="w-full flex items-center text-red-500 font-semibold py-6">
            Error: {error}
          </div>
        )}
      </div>
    );
  }

  const handleDeletePersonalDetails = async (id) => {
    try {
      await deletePersonalDetailsMutation.mutateAsync(id);
      toast.success("Personal details deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting personal details:", error);
    }
  };

  const personalDetails = data.data.personalDetails || {};

  return (
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
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font-semibold">
          Location:
        </span>
        <span>{personalDetails?.location || "N/A"}</span>
      </div>
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font font-semibold">
          Linked Profile:
        </span>
        <Link to={personalDetails?.linkedin} target="_blank">
          <span>{personalDetails?.linkedin || "N/A"}</span>
        </Link>
      </div>
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font font-semibold">
          GitHub:
        </span>
        <Link to={personalDetails?.github} target="_blank">
          <span>{personalDetails?.github || "N/A"}</span>
        </Link>
      </div>
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font font-semibold">
          Portifolio Site:
        </span>
        <Link to={personalDetails?.portfolioSite} target="_blank">
          <span>{personalDetails?.portfolioSite || "N/A"}</span>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="text-gray-900 text-[16px] font font-semibold">
          About me
        </span>
        <span>{personalDetails.aboutMe}</span>
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
  );
};

export default PersonalDetails;
