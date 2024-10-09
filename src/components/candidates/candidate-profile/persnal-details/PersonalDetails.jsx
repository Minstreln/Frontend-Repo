/* eslint-disable react/prop-types */

import userImage from "@/assets/user.png";
import useAuth from "../../../../hooks/useAuth";
import EditPersonalDetails from "./EditPersonalDetails";
import { Button } from "../../../ui/button";
import { RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
const PersonalDetails = ({ personalDetails, refetch }) => {
  const { user } = useAuth();
  return (
    <div className="w-full flex flex-col gap-5 pb-8">
      <div className="w-full flex flex-row items-start justify-between">
        <img
          src={personalDetails?.profileImage || userImage}
          alt="profile image"
          className="w-40 h-40 object-cover"
        />
        <Button
          variant="default"
          size="sm"
          onClick={() => refetch()}
          className="hidden lg:block"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
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
          <span>{personalDetails?.middleName}</span>
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
        <span>{personalDetails?.location}</span>
      </div>
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font font-semibold">
          Linked Profile:
        </span>
        <Link to={personalDetails?.linkedin} target="_blank">
          <span>{personalDetails?.linkedin}</span>
        </Link>
      </div>
      <div className="w-full flex flex-row gap-5">
        <span className="text-gray-900 text-[16px] font font-semibold">
          GitHub:
        </span>
        <Link to={personalDetails?.github} target="_blank">
          <span>{personalDetails?.github}</span>
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
      <EditPersonalDetails
        personalDetails={personalDetails}
        refetch={refetch}
      />
    </div>
  );
};

export default PersonalDetails;
