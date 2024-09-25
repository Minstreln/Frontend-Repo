/* eslint-disable react/prop-types */

import google from "@/assets/google.svg";
import jobLocation from "@/assets/jobLocation.png";
import { Button } from "../ui/button";
import {
  Bookmark,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  Layers,
} from "lucide-react";
import ApplyJob from "./ApplyJob";
import { useSaveJob } from "../../hooks/useSaveJob";
import useAuth from "../../hooks/useAuth";
import { userRole } from "../../lib/constants";

const JobDetails = ({ job }) => {
  const { saveJob, loading, success } = useSaveJob();
  const { user } = useAuth();

  const handleSaveJob = async (e) => {
    e.preventDefault(); // Prevent the Link component from navigating
    await saveJob(job._id);
  };

  return (
    <div className="wrapper w-full flex flex-col gap-5 py-12">
      <div className="w-full flex flex-col sm:flex-row items-start lg:items-center justify-between pb-4 gap-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="rounded bg-primary/10 flex flex-row items-start justify-start p-3">
            <img
              className="h-12 w-12 relative overflow-hidden"
              alt=""
              src={google}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-gray-900 leading-[24px] text-xl">
              {job.position}
            </h1>
            <div className="self-stretch flex flex-row items-center justify-start gap-2 text-sm">
              <span className="text-gray-400">at {job.hiringCompany}</span>
              <span className="text-white inline-block px-2 py-1 bg-[#0BA02C] rounded font-bold uppercase text-xs">
                {job.employmentType}
              </span>
              <span className="hidden sm:inline-block text-[#E05151] bg-destructive/10 px-4 py-1 rounded-full">
                Featured
              </span>
            </div>
          </div>
        </div>
        {user?.role === userRole.jobSeeker && (
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              variant="ghost"
              onClick={handleSaveJob}
              disabled={loading || success}
              className="rounded bg-primary/10 flex flex-row items-center justify-center p-3"
            >
              <Bookmark
                className={`${
                  success ? "fill-primary" : ""
                } h-6 w-6 text-primary `}
              />
            </Button>
            <ApplyJob job={job} />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-5 sm:flex-row">
        <div className="sm:flex-[2] flex flex-col gap-3 text-gray-400 leading-[24px] text-lg">
          <p className="text-gray-900  font-medium pb-2">Job Description</p>
          <p>{job.jobDescription}</p>
          <p>Want to work with us? You&apos;re in good company!</p>

          <p className="text-gray-900  font-medium pb-2">Responsibilities:</p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            {job.responsibility.map((res) => (
              <li key={res}>{res}</li>
            ))}
            <li>Working knowledge of payment gateways</li>
            <li>API platform experience / Building restful APIs</li>
          </ol>
          <p className="text-gray-900  font-medium pb-2">Requirements:</p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ol>

          <p className="text-gray-900  font-medium pb-2">
            Skills And Qualifications:
          </p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            {job.skillsAndQualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          {user?.role === userRole.jobSeeker && (
            <div className="flex flex-row items-center justify-start gap-2 py-8">
              <Button
                variant="ghost"
                onClick={handleSaveJob}
                disabled={loading || success}
                className="rounded bg-primary/10 flex flex-row items-center justify-center p-3"
              >
                <Bookmark
                  className={`${
                    success ? "fill-primary" : ""
                  } h-6 w-6 text-primary `}
                />
              </Button>
              <ApplyJob job={job} />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div className="w-full flex flex-row gap-4 items-center justify-between border border-gray-200 p-5 rounded-lg text-center">
            <div className="w-full flex flex-col items-center justify-center gap-1 text-gray-600">
              <span className="text-gray-900 font-semibold">Salary(USD)</span>
              <span className="text-[#0BA02C] font-semibold text-lg">
                {job.salary}
              </span>
              <span className="text-sm">Yearly salary</span>
            </div>
            <div className="w-[2px] h-20 bg-gray-200" />
            <div className="w-full flex flex-col items-center justify-center gap-1 text-gray-600">
              <img className="h-10 w-10 relative" alt="" src={jobLocation} />
              <span className="text-gray-900 font-semibold">Job Location</span>
              <span>{job.location}</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 border border-gray-200 rounded-lg">
            <div className="w-full flex flex-col gap-5 p-5">
              <h2 className="text-gray-900 font-semibold text-lg">
                Job Overview
              </h2>
              <div className="w-full grid grid-cols-3 gap-x-2 gap-y-5">
                <div className="flex flex-col gap-3">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB POSTED:
                    </span>
                    <span className="text-gray-900 font-medium">
                      {new Date(job.createdAt).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB EXPIRE IN:
                    </span>
                    <span className="text-gray-900 font-medium">
                      {new Date(job.expirationDate).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Layers className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB LEVEL:
                    </span>
                    <span className="text-gray-900 font-medium">
                      {job.positionLevel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      EXPERIENCE
                    </span>
                    <span className="text-gray-900 font-medium">
                      Years: {job.yearsOfExperience}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      EDUCATION
                    </span>
                    <span className="text-gray-900 font-medium">
                      Graduation
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-200" />

            <div className="flex flex-col gap-3 px-5 pb-5">
              <h3 className="text-gray-900 font-semibold text-lg">Job tags:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  Back-end
                </Button>
                <Button variant="secondary" size="sm">
                  JavaScript
                </Button>
                <Button variant="secondary" size="sm">
                  NodeJS
                </Button>
                <Button variant="secondary" size="sm">
                  Development
                </Button>
                <Button variant="secondary" size="sm">
                  Front-end
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
