import { Button } from "../../ui/button";
import logo2 from "@/assets/logo2.svg";
import mappin from "@/assets/mappin.svg";

const CompanyCard = () => {
  return (
    <div
      className={`w-[424px] shadow-[0px_2px_18px_rgba(24,_25,_28,_0.03)] rounded-lg bg-gray-00 border-gray-200 border-[1px] border-solid box-border flex flex-col items-start justify-start py-[22px] px-[23px] gap-5 max-w-full text-left text-lg text-gray-scale-900 font-body-medium-400`}
    >
      <div className="self-stretch flex flex-row items-start justify-start gap-4 md:flex-wrap">
        <div className="rounded bg-[#EA4C89] flex flex-row items-start justify-start p-4">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            alt=""
            src={logo2}
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-1.5 min-w-[198px]">
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="relative leading-[28px] font-medium">Dribbble</div>
            <div className="rounded-33xl bg-danger-50 flex flex-row items-start justify-start py-[3px] pl-3 pr-[11px] text-sm text-danger-500">
              <div className="relative leading-[20px] text-[#E05151] bg-destructive/10 px-4 py-1 rounded-full">
                Featured
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-1 text-sm text-gray-500">
            <img className="h-[18px] w-[18px] relative" alt="" src={mappin} />
            <div className="flex-1 relative leading-[20px]">
              Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>
      <Button
        className="self-stretch h-12 w-full bg-primary/10 text-primary font-bold"
        variant="contained"
      >
        Open Position (3)
      </Button>
    </div>
  );
};

export default CompanyCard;
