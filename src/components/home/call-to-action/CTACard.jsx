/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTACard = ({ propColor, image, title, description }) => {
  const becomeACandidateStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div
      className={`flex-1 relative rounded-xl flex flex-col items-start justify-start p-[50px] box-border gap-[26px] bg-cover bg-no-repeat bg-[top] max-w-full text-left text-13xl font-medium text-gray-900 overflow-hidden`}
    >
      <img
        src={image}
        alt="bg-image"
        className="object-cover absolute top-0 left-0 -z-0 h-full w-full"
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-4">
        <h1
          className="m-0 self-stretch relative text-gray-900 leading-[40px] font-medium font-[inherit]"
          style={becomeACandidateStyle}
        >
          {title}
        </h1>
        <div className="w-[312px] relative text-sm leading-[20px] text-gray-400 inline-block">
          {description}
        </div>
      </div>
      <Link to={"/signup"} className="z-10">
        <Button
          className="w-48 h-12 text-primary bg-white hover:bg-gray-100 transition-all"
          variant="contained"
        >
          Register now
          <span>
            <ArrowRight className="h-4 w-6 mr-3 text-primary" />
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default CTACard;
