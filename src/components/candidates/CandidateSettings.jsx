import { BookOpen, BookText, Globe, User2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AcademicDetailsForm from "./AcademicDetailsForm";
import WorkExperienceDetailsForm from "./WorkExperienceDetailsForm";
import ResumeForm from "./ResumeForm";
const CandidateSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-lg text-gray-800 font-semibold">Settings</h2>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-fit bg-white">
          <TabsTrigger
            value="personal"
            onClick={() => setActiveTab("personal")}
            className={`py-1 mb-5 font-medium border-b-2 border-b-white !rounded-none  !shadow-none transition-colors ${
              activeTab === "personal"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <User2 className="mr-2 h-5 w-5" /> Personal Details
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            onClick={() => setActiveTab("academic")}
            className={`py-1 mb-5 font-medium border-b-2 border-b-white !rounded-none  !shadow-none transition-colors ${
              activeTab === "academic"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <BookOpen className="mr-2 h-5 w-5" /> Academic Details
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            onClick={() => setActiveTab("experience")}
            className={`py-1 mb-5 font-medium border-b-2 border-b-white !rounded-none  !shadow-none transition-colors ${
              activeTab === "experience"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <Globe className="mr-2 h-5 w-5" />
            Work Experience
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            onClick={() => setActiveTab("resume")}
            className={`py-1 mb-5 font-medium border-b-2 border-b-white !rounded-none  !shadow-none transition-colors ${
              activeTab === "resume"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <BookText className="mr-2 h-5 w-5" />
            Resume
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="w-full">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Personal Details</h3>
            <div className="w-full">
              <PersonalDetailsForm />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="academic" className="w-full">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Academic Details</h3>
            <div className="w-full">
              <div className="w-full flex flex-col items-center justify-between py-8">
                <span className="text-gray-600 text-lg">
                  No academic details added yet
                </span>
              </div>
              <AcademicDetailsForm />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="experience" className="w-full">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Work Experience</h3>
            <div className="w-full">
              <div className="w-full flex flex-col items-center justify-between py-8">
                <span className="text-gray-600 text-lg">
                  No work experience details added yet
                </span>
              </div>
              <WorkExperienceDetailsForm />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resume" className="w-full">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Upload Resume</h3>
            <div className="w-full">
              <div className="w-full flex flex-col items-center justify-between py-8">
                <span className="text-gray-600 text-lg">
                  No resume uploaded yet
                </span>
              </div>
              <ResumeForm />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateSettings;
