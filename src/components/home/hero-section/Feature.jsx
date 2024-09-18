/* eslint-disable react/prop-types */
import { useMemo } from "react";

const Feature = ({
  briefcaseDuotone1,
  emptyInfo,
  liveJob,
  propBackgroundColor,
}) => {
  const iconStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);
  return (
    <div
      className={`w-[312px] rounded-lg bg-gray-50 flex flex-row items-center justify-start p-5 box-border gap-5 text-left text-5xl text-gray-900 font-body-medium-400 shadow-sm hover:shadow-md group`}
    >
      <div
        className="rounded flex flex-row items-start justify-start p-4 bg-[#e7f0fa] group-hover:bg-primary/50"
        style={iconStyle}
      >
        <img
          className="h-10 w-10 relative overflow-hidden shrink-0 z-10"
          loading="lazy"
          alt=""
          src={briefcaseDuotone1}
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-start gap-1.5">
        <div className="self-stretch relative leading-[32px] font-medium text-3xl">
          {emptyInfo}
        </div>
        <div className="self-stretch relative text-base leading-[24px] text-gray-500 whitespace-nowrap">
          {liveJob}
        </div>
      </div>
    </div>
  );
};

export default Feature;
