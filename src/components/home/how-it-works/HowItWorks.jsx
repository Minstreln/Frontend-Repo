import CreateAccount from "./CreateAccount";
import circlewave from "@/assets/circlewave.svg";
import user from "@/assets/user.svg";
import glass from "@/assets/glass.svg";
import cloud from "@/assets/cloud.svg";
import arrows1 from "@/assets/arrows1.svg";
import arrows from "@/assets/arrows.svg";

const HowItWorks = () => {
  return (
    <section
      className={`self-stretch bg-[#F1F2F4] w-full flex flex-col items-center justify-start py-[100px] box-border gap-[50px] max-w-full text-center text-21xl text-gray-900 font-body-medium-400 md:gap-[25px] md:pt-[65px] md:pb-[65px] md:box-border`}
    >
      <div className="wrapper flex flex-row items-start justify-center">
        <h1 className="m-0 relative text-inherit leading-[48px] font-medium font-[inherit] text-4xl">
          How jobpilot work
        </h1>
      </div>
      <div className="wrapper flex flex-row items-start justify-center flex-wrap content-start gap-6 text-lg">
        <CreateAccount
          propBackgroundColor1="#fff"
          userPlusDuotone1={user}
          createAccount="Create account"
          aliquamFacilisisEgestasSapien="Aliquam facilisis egestas sapien, nec tempor leo tristique at."
          arrows={arrows}
        />
        <CreateAccount
          propBackgroundColor="#fff"
          propPadding="unset"
          propBackgroundColor1="#0a65cc"
          userPlusDuotone1={cloud}
          createAccount="Upload CV/Resume"
          aliquamFacilisisEgestasSapien="Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales"
          arrows={arrows1}
          propTop="64px"
        />
        <CreateAccount
          propBackgroundColor="unset"
          propPadding="0px 20px"
          propBackgroundColor1="#fff"
          userPlusDuotone1={glass}
          createAccount="Find suitable job"
          aliquamFacilisisEgestasSapien="Phasellus quis eleifend ex. Morbi nec fringilla nibh."
          arrows={arrows}
          propTop="4px"
        />

        <div className="flex-1 rounded-xl flex flex-col items-start justify-start p-6 box-border gap-6 min-w-[285px] max-w-[312px]">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <div className="h-[72px] w-[72px] rounded-full bg-white flex flex-row items-start justify-start p-5 box-border">
              <img
                className="h-8 w-8 relative overflow-hidden shrink-0"
                alt=""
                src={circlewave}
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            <div className="self-stretch relative leading-[28px] font-medium">
              Apply job
            </div>
            <div className="self-stretch relative text-sm leading-[20px] text-gray-500">
              Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
              purus.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
