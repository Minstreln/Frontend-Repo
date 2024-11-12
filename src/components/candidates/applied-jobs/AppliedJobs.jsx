import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../styles/customTableSyales";
import { Check } from "lucide-react";
import { Button } from "../../ui/button";
import Loading from "../../Loading";
import { useFetchAppliedJobs } from "../../../hooks/useJobs";

const AppliedJobs = () => {
  const { data, isLoading, error } = useFetchAppliedJobs();

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
              <span>{row.jobListing?.position}</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-primary/10 text-primary ml-2">
                {row.jobListing?.jobSetup}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {row.jobListing?.location} • {row.jobListing?.positionLevel}
            </div>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Date Applied",
      selector: (row) => new Date(row.createdAt).toDateString(),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-500">{row.status}</span>
        </div>
      ),
    },
    {
      name: "Action",
      cell: () => (
        <Button
          variant="secondary"
          size="sm"
          className="text-primary font-semibold hover:bg-primary hover:text-primary-foreground"
        >
          View Details
        </Button>
      ),
      button: true,
      width: "120px",
    },
  ];

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
        Error: {error}
      </div>
    );

  const appliedJobsCount = data?.results || 0;
  const appliedJobs = data?.data?.applications || [];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <h2 className="text-lg text-gray-800 font-semibold">Applied Jobs</h2>
          <span className="text-sm text-gray-600">({appliedJobsCount})</span>
        </div>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          No jobs found
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={appliedJobs}
          customStyles={customTableStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20]}
          noHeader
        />
      )}
    </div>
  );
};

export default AppliedJobs;
