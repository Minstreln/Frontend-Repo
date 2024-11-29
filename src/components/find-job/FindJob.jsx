import Breadcrumb from "../Breadcrumb";
import JobCard from "../home/featured-job/JobCard";
import SearchJobs from "./SearchJobs";
import Pagination from "../Pagination";
import { JOBS_PER_PAGE } from "../../lib/constants";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Loading from "../Loading";
import { useFetchAllJobs } from "../../hooks/useJobs";

const FindJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const { data: jobs, isLoading, error } = useFetchAllJobs();

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    return jobs.filter((job) => {
      // Search term filter
      const matchesSearch =
        !searchTerm ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.hiringCompany.toLowerCase().includes(searchTerm.toLowerCase());

      // Location filter
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchTerm, locationFilter]);

  const totalPages = useMemo(
    () => Math.ceil(filteredJobs.length / JOBS_PER_PAGE),
    [filteredJobs]
  );

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Find Job</h1>
          <Breadcrumb />
        </div>
      </div>
      {isLoading && (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          <Loading />
        </div>
      )}

      {error && (
        <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && jobs && jobs.length === 0 && (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          No jobs found
        </div>
      )}

      {!isLoading && !error && jobs && jobs.length > 0 && (
        <div className="bg-white self-stretch w-full pb-16">
          <div className="wrapper flex flex-col py-6 gap-8">
            <SearchJobs
              onSearch={setSearchTerm}
              onLocationFilter={setLocationFilter}
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-left text-lg text-gray-900">
              {paginatedJobs.map((job) => (
                <Link key={job._id} to={`/find-job/${job._id}`}>
                  <JobCard
                    position={job.position}
                    employmentType={job.employmentType}
                    salary={job.minSalary}
                    hiringCompany={job.hiringCompany}
                    companyLocation={job.location}
                  />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FindJob;
