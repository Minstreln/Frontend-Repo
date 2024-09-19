import { useMemo, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import CompanyCard from "../home/top-companies/CompanyCard";
import PopularSearches from "./PopularSearches";
import SearchComponet from "./SearchComponent";
import { COMPANIES_PER_PAGE, companies } from "../../lib/constants";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const FindEmployers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(companies.length / COMPANIES_PER_PAGE);

  const currentCompanies = useMemo(() => {
    const indexOfLastComp = currentPage * COMPANIES_PER_PAGE;
    const indexOfFirstComp = indexOfLastComp - COMPANIES_PER_PAGE;
    return companies.slice(indexOfFirstComp, indexOfLastComp);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section>
      <div className="bg-[#F1F2F4] w-full self-stretch">
        <div className="wrapper flex items-center justify-between py-5">
          <h1 className="text-gray-900">Find Employers</h1>
          <Breadcrumb />
        </div>
      </div>
      <div className="bg-white w-full self-stretch">
        <div className="wrapper flex flex-col gap-5 py-5">
          <SearchComponet />
          <PopularSearches />
          <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-lg text-gray-900">
            {currentCompanies.map((index) => (
              <Link key={index} to={`/find-employers/${index}`}>
                <CompanyCard />
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default FindEmployers;
