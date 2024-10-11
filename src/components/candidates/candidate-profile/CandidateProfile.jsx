import { BookOpen, BookText, Globe, User2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useState } from "react";
import PersonalDetails from "./persnal-details/PersonalDetails";
import AcademicDetails from "./education/AcademicDetails";
import WorkExperienceDetails from "./work-experience/WorkExperienceDetails";
import { cn } from "../../../lib/utils";
import Resumes from "./resume/Resumes";

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-lg text-gray-800 font-semibold">
        Candidate Profile Settings
      </h2>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full bg-white grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger
            value="personal"
            onClick={() => setActiveTab("personal")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "personal"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <User2 className="mr-2 h-5 w-5" /> Personal Details
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            onClick={() => setActiveTab("academic")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "academic"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <BookOpen className="mr-2 h-5 w-5" /> Academic Details
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            onClick={() => setActiveTab("experience")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "experience"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <Globe className="mr-2 h-5 w-5" />
            Work Experience
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            onClick={() => setActiveTab("resume")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "resume"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <BookText className="mr-2 h-5 w-5" />
            Resume
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Personal Details</h3>
            <div className="w-full">
              <PersonalDetails />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="academic" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Education</h3>
            <div className="w-full">
              <AcademicDetails />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="experience" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Work Experience</h3>
            <div className="w-full">
              <WorkExperienceDetails />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resume" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Upload Resume</h3>
            <div className="w-full">
              <Resumes />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;
