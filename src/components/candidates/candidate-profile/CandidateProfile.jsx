import { BookOpen, BookText, Globe, User2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useState } from "react";
import PersonalDetailsForm from "./persnal-details/PersonalDetailsForm";
import AcademicDetailsForm from "./education/AcademicDetailsForm";
import WorkExperienceDetailsForm from "./work-experience/WorkExperienceDetailsForm";
import ResumeForm from "./resume/ResumeForm";
import { useJobSeekerPersonalDetails } from "../../../hooks/useJobSeekerPersonalDetails";
import Loading from "../../Loading";
import PersonalDetails from "./persnal-details/PersonalDetails";
import { useJobSeekerAcademicDetails } from "../../../hooks/useJobSeekerAcademicDetails";
import AcademicDetails from "./education/AcademicDetails";
import { useJobSeekerWorkExperience } from "../../../hooks/useJobSeekerWorkExperience";
import WorkExperienceDetails from "./work-experience/WorkExperienceDetails";
import { cn } from "../../../lib/utils";
import { useJobSeekerResume } from "../../../hooks/useJobSeekerResume";
import Resumes from "./resume/Resumes";

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const { personalDetails, loading, error, refetch } =
    useJobSeekerPersonalDetails();

  const {
    academicDetails,
    loading: academicLoading,
    error: academicError,
    refetch: academicRefetch,
    deleteAcademicDetail,
  } = useJobSeekerAcademicDetails();

  const {
    workExperience,
    loading: experienceLoading,
    error: experienceError,
    refetch: experienceRefetch,
    deleteWorkExperience,
  } = useJobSeekerWorkExperience();

  const {
    resumes,
    loading: resumeLoading,
    error: resumeError,
    refetch: resumeRefetch,
    deleteResume,
  } = useJobSeekerResume();

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
              {loading && (
                <div className="py-6">
                  <Loading />
                </div>
              )}

              {!loading && (
                <>
                  {(!personalDetails ||
                    (Array.isArray(personalDetails) &&
                      personalDetails.length === 0)) && (
                    <PersonalDetailsForm refetch={refetch} />
                  )}

                  {personalDetails && !Array.isArray(personalDetails) && (
                    <PersonalDetails
                      personalDetails={personalDetails}
                      refetch={refetch}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="academic" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Education</h3>
            <div className="w-full">
              {academicLoading && (
                <div className="py-6">
                  <Loading />
                </div>
              )}
              {academicError && (
                <div className="w-full flex items-center text-red-500 font-semibold py-6">
                  Error: {error}
                </div>
              )}

              {!academicLoading && !academicError && !academicDetails && (
                <AcademicDetailsForm />
              )}

              {!academicLoading && !academicError && academicDetails && (
                <div className="w-full space-y-5">
                  <AcademicDetails
                    academicDetails={academicDetails}
                    refetch={academicRefetch}
                    deleteAcademicDetail={deleteAcademicDetail}
                  />
                  <AcademicDetailsForm refetch={academicRefetch} />
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="experience" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Work Experience</h3>
            <div className="w-full">
              {experienceLoading && (
                <div className="py-6">
                  <Loading />
                </div>
              )}
              {experienceError && (
                <div className="w-full flex items-center text-red-500 font-semibold py-6">
                  Error: {error}
                </div>
              )}

              {!experienceLoading && !experienceError && !workExperience && (
                <WorkExperienceDetailsForm />
              )}

              {!experienceLoading && !experienceError && workExperience && (
                <div className="w-full space-y-5">
                  <WorkExperienceDetails
                    workExperience={workExperience}
                    refetch={experienceRefetch}
                    deleteWorkExperience={deleteWorkExperience}
                  />
                  <WorkExperienceDetailsForm refetch={experienceRefetch} />
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resume" className="w-full mt-12 sm:mt-8">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-gray-900 pb-2">Upload Resume</h3>
            <div className="w-full">
              {resumeLoading && (
                <div className="py-6">
                  <Loading />
                </div>
              )}
              {resumeError && (
                <div className="w-full flex items-center text-red-500 font-semibold py-6">
                  Error: {error}
                </div>
              )}

              {!resumeLoading && !resumeError && !resumes && (
                <div className="w-full">
                  <div className="w-full flex flex-col items-center gap-5 justify-between py-8">
                    <span className="text-primary text-lg">
                      No resume uploaded
                    </span>
                  </div>
                  <ResumeForm />
                </div>
              )}

              {!resumeLoading && !resumeError && resumes && (
                <div className="w-full space-y-5">
                  <Resumes
                    resumes={resumes}
                    refetch={resumeRefetch}
                    deleteResume={deleteResume}
                  />
                  <ResumeForm refetch={resumeRefetch} />
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;
