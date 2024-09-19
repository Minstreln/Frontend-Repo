import { useMemo, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import JobCard from "../home/featured-job/JobCard";
import SearchAndFilter from "./SearchAndFilter";
import jobs from "../../lib/jobs";
import Pagination from "../Pagination";
import { JOBS_PER_PAGE } from "../../lib/constants";
import { Link } from "react-router-dom";

const FindJob = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * JOBS_PER_PAGE;
    const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
    return jobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Find Job</h1>
          <Breadcrumb />
        </div>
      </div>
      <div className="bg-white self-stretch w-full pb-16">
        <div className="wrapper flex flex-col py-6 gap-8">
          <SearchAndFilter />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-left text-lg text-gray-900">
            {currentJobs.map((job) => (
              <Link key={job.id} to={`/find-job/${job.id}`}>
                <JobCard {...job} />
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white self-stretch w-full py-16 border-t border-[#F1F2F4]">
          <div className="wrapper flex flex-col py-6 gap-8">
            <h2 className="text-gray-900 text-2xl">Related Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-left text-lg text-gray-900">
              {jobs.slice(0, 6).map((job) => (
                <JobCard key={job.title} {...job} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindJob;
