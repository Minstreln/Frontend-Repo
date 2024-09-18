import Feature from "./Feature";
import { MapPin, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import hero from "@/assets/hero.svg";
import briefcase from "@/assets/briefcase.svg";
import building from "@/assets/building.svg";
import users from "@/assets/users.svg";

const HeroSection = () => {
  return (
    <section
      className={`flex flex-col items-start justify-start py-24 gap-24 w-full bg-[#F1F2F4]`}
    >
      <div className="w-full flex justify-center">
        <div className="wrapper w-full flex flex-wrap justify-between gap-8">
          <div className="flex-1 min-w-[320px] pt-[9px]">
            <div className="flex flex-col gap-6 max-w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-gray-900">
                Find a job that suits your interest & skills.
              </h1>
              <div className="flex flex-col gap-8 text-lg text-gray-600">
                <p className="max-w-[536px]">
                  Aliquam vitae turpis in diam convallis finibus in at risus.
                  Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
                </p>
                <div className="flex flex-wrap gap-5 items-center bg-white rounded-lg shadow-sm p-2.5 border border-gray-100 max-w-2xl">
                  <div className="flex-1 min-w-[200px] flex items-center gap-2">
                    <Search className="text-gray-400" />
                    <Input
                      placeholder="Job title, Keyword..."
                      className="border-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="w-px h-8 bg-gray-100 hidden sm:block" />
                  <div className="flex-1 text-gray-400 min-w-[200px] flex items-center gap-2">
                    <MapPin />
                    <Input
                      placeholder="Your Location"
                      className="border-none focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 font-semibold py-5"
                    size="lg"
                  >
                    Find Job
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span className="text-gray-400">Suggestion:</span>
                <span>Designer,</span>
                <span>Programming,</span>
                <span className="font-medium text-primary">
                  Digital Marketing,
                </span>
                <span>Video,</span>
                <span>Animation.</span>
              </div>
            </div>
          </div>
          <img
            className="flex-1 min-w-[300px] max-w-[492px] object-contain"
            loading="lazy"
            alt=""
            src={hero}
          />
        </div>
      </div>
      <div className="wrapper w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8 sm:px-24 lg:px-0">
        <Feature
          briefcaseDuotone1={briefcase}
          emptyInfo="1,75,324"
          liveJob="Live Job"
        />
        <Feature
          propBackgroundColor="#0a65cc"
          briefcaseDuotone1={building}
          emptyInfo="97,354"
          liveJob="Companies"
        />
        <Feature
          briefcaseDuotone1={users}
          emptyInfo="38,47,154"
          liveJob="Candidates"
        />
        <Feature
          briefcaseDuotone1={briefcase}
          emptyInfo="7,532"
          liveJob="New Jobs"
        />
      </div>
    </section>
  );
};

export default HeroSection;
