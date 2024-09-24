import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import { Button } from "../../ui/button";
import { useAllJobs } from "../../../hooks/useAllJobs";
import { Link } from "react-router-dom";

const FeaturedJob = () => {
  const { jobs, loading } = useAllJobs();
  return (
    <section
      className={`self-stretch bg-white flex flex-col items-center justify-center py-24 box-border gap-12 max-w-full text-center text-21xl text-gray-900 font-body-medium-400 border-t border-t-[#F1F2F4]`}
    >
      <div className="wrapper flex flex-row items-center justify-between gap-5 w-full">
        <h1 className="text-inherit leading-[48px] font-medium font-[inherit] inline-block max-w-full text-4xl md:text-5xl">
          Featured job
        </h1>
        <Link to="/find-job">
          <Button className="text-primary" variant="outlined">
            View All{" "}
            <span>
              <ArrowRight className="h-4 w-6 mr-3 text-primary" />
            </span>
          </Button>
        </Link>
      </div>
      <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-left text-lg text-gray-900">
        {loading && (
          <div className="w-full flex items-center text-primary font-semibold">
            Loading...
          </div>
        )}
        {jobs &&
          jobs.slice(0, 6).map((job) => (
            <Link key={job._id} to={`/find-job/${job._id}`}>
              <JobCard {...job} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default FeaturedJob;
