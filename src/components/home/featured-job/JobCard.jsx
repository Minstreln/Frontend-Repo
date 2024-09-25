/* eslint-disable react/prop-types */

import bookmark from "@/assets/bookmark.svg";
import mappin from "@/assets/mappin.svg";
import google from "@/assets/google.svg";

const JobCard = ({
  position,
  employmentType,
  salary,
  hiringCompany,
  companyLocation,
}) => {
  return (
    <div
      className={`w-[380px] sm:w-[424px] shadow-[0px_2px_18px_rgba(24,_25,_28,_0.03)] rounded-lg hover:custom-gradient border-gray-200 border-[1px] border-solid box-border flex flex-col items-start justify-start py-[22px] px-[23px] gap-5 max-w-full text-left text-lg text-gray-900 font-body-medium-400 hover:cursor-pointer transition-all`}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-1.5">
        <div className="self-stretch relative leading-[28px] font-medium">
          {position}
        </div>
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-500">
          <div
            className={`rounded-10xs bg-success-50 flex flex-row items-start justify-start py-1 pl-2 pr-[7px] text-left text-xs text-success-500 font-body-medium-400 `}
          >
            <div className="leading-[12px] uppercase font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
              {employmentType}
            </div>
          </div>
          <div className="relative leading-[20px]">Salary:${salary}</div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-center gap-3 text-base mq450:flex-wrap">
        <div className="rounded bg-primary/10 flex flex-row items-start justify-start p-3">
          <img
            className="h-6 w-6 relative overflow-hidden"
            alt=""
            src={google}
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-1 min-w-[182px]">
          <div className="self-stretch relative leading-[24px] font-medium">
            {hiringCompany}
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-1 text-sm text-gray-500">
            <img className="h-[18px] w-[18px] relative" alt="" src={mappin} />
            <div className="flex-1 relative leading-[20px]">
              {companyLocation}
            </div>
          </div>
        </div>
        <img className="h-6 w-6 relative" alt="" src={bookmark} />
      </div>
    </div>
  );
};

export default JobCard;
