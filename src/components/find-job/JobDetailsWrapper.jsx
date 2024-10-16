import { useParams } from "react-router-dom";
import JobDetails from "./JobDetails";
import Breadcrumb from "../Breadcrumb";
import Loading from "../Loading";
import { useFetchJobById } from "../../hooks/useJobs";

const JobDetailsWrapper = () => {
  const jobId = useParams().jobId;
  const { data: job, isLoading, error } = useFetchJobById(jobId);

  return (
    <section>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Job Details</h1>
          <Breadcrumb />
        </div>
      </div>
      {isLoading ? (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-8">
          <Loading />
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
