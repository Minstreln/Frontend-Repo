import { useParams } from "react-router-dom";
import JobDetails from "./JobDetails";
import Breadcrumb from "../Breadcrumb";
import { useSingleJob } from "../../hooks/useSingleJob";

const JobDetailsWrapper = () => {
  const { jobId } = useParams();
  const { job, loading, error } = useSingleJob(jobId);

  return (
    <section>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Job Details</h1>
          <Breadcrumb />
        </div>
      </div>
      {loading ? (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          Loading...
        </div>
      ) : error ? (
        <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
          {error}
        </div>
      ) : job ? (
        <JobDetails job={job} />
      ) : (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          Job Not Found
        </div>
      )}
    </section>
  );
};

export default JobDetailsWrapper;
