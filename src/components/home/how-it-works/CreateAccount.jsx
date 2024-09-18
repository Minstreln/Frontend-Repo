/* eslint-disable react/prop-types */
import { useMemo } from "react";

const CreateAccount = ({
  className = "",
  propBackgroundColor,
  propPadding,
  propBackgroundColor1,
  userPlusDuotone1,
  createAccount,
  aliquamFacilisisEgestasSapien,
  arrows,
  propTop,
}) => {
  const createAccountStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const stepIconContainersStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const icon1Style = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
    };
  }, [propBackgroundColor1]);

  const arrowsIconStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div
      className={`flex-1 rounded-xl flex flex-col items-start justify-start p-6 box-border relative gap-6 min-w-[285px] max-w-[312px] text-center text-lg text-gray-900 font-body-medium-400 ${className}`}
      style={createAccountStyle}
    >
      <div
        className="self-stretch flex flex-row items-start justify-center py-0 px-5"
        style={stepIconContainersStyle}
      >
        <div
          className="h-[72px] w-[72px] rounded-full bg-gray-00 flex flex-row items-start justify-start p-5 box-border"
          style={icon1Style}
        >
          <img
            className="h-8 w-8 relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src={userPlusDuotone1}
          />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-3">
        <div className="self-stretch relative leading-[28px] font-medium">
          {createAccount}
        </div>
        <div className="self-stretch relative text-sm leading-[20px] text-gray-500">
          {aliquamFacilisisEgestasSapien}
        </div>
      </div>
      <img
        className="w-[222px] h-12 absolute !m-[0] top-[4px] right-[-123px] z-[1] hidden sm:block"
        loading="lazy"
        alt=""
        src={arrows}
        style={arrowsIconStyle}
      />
    </div>
  );
};

export default CreateAccount;
