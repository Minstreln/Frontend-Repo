import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../styles/customTableSyales";
import { Button } from "../../ui/button";
import { Bookmark, RefreshCw } from "lucide-react";
import { useSavedJobs } from "../../../hooks/useSavedJobs";
import ApplyJob from "../../find-job/ApplyJob";
import Loading from "../../Loading";

const SavedJobs = () => {
  const { savedJobs, loading, error, refetch, numberOfSavedJobs } =
    useSavedJobs();

  const columns = [
    {
      name: "Job",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="flex items-center py-2">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full" />
            {/** <img
              src={row.companyLogo}
              alt={`${row.company} logo`}
              className="w-full h-full object-cover"
            /> */}
          </div>
          <div className="flex flex-col gap-1 ml-4">
            <div className="text-sm font-medium text-gray-900">
              <span>{row.position}</span>
              <span className="px-2 py-[2px] text-xs font-semibold rounded-lg bg-primary/10 text-primary ml-2">
                {row.employmentType}
              </span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-5">
              <span>{row.location}</span> <span>{row.salary}</span>
            </div>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Bookmark className="h-6 w-6 text-primary fill-primary mr-2" />
          <ApplyJob job={row} size="sm" />
        </>
      ),
      button: true,
      width: "180px",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <h2 className="text-lg text-gray-800 font-semibold">Saved Jobs</h2>
          <span className="text-sm text-gray-600">({numberOfSavedJobs})</span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => refetch()}
          className="hidden lg:block"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
      {loading && (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          <Loading />
        </div>
      )}

      {error && (
        <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
          Error: {error}
        </div>
      )}

      {!loading && !error && savedJobs.length === 0 && (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          No jobs found
        </div>
      )}

      {!loading && !error && savedJobs.length > 0 && (
        <DataTable
          columns={columns}
          data={savedJobs}
          customStyles={customTableStyles}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[10, 15, 20]}
          noHeader={true}
        />
      )}
    </div>
  );
};

export default SavedJobs;
