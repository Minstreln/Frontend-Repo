import { useParams } from "react-router-dom";
import JobDetails from "./JobDetails";
import jobs from "../../lib/jobs";
import Breadcrumb from "../Breadcrumb";

const JobDetailsWrapper = () => {
  const { jobId } = useParams();
  const job = jobs.find((job) => job.id === jobId); // Fetch job by ID

  return (
    <>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Job Details</h1>
          <Breadcrumb />
        </div>
      </div>
      {job ? (
        <JobDetails job={job} />
      ) : (
        <div className="w-full flex items-center justify-center text-primary text-2xl font-semibold py-12">
          Job Not Found
        </div>
      )}
    </>
  );
};

export default JobDetailsWrapper;
