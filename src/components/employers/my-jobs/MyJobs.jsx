import DataTable from "react-data-table-component";
import { useFetchRecruiterOpenJobs } from "../../../hooks/useJobs";
import { customTableStyles } from "../../../styles/customTableSyales";
import Loading from "../../Loading";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";
import JobActions from "./JobActions";

const MyJobs = () => {
  const { data, isLoading, error } = useFetchRecruiterOpenJobs();

  const columns = [
    {
      name: "Job",
      selector: (row) => row.position,
      cell: (row) => (
        <div className="flex items-center py-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-gray-900">
              {row?.position}
            </h3>
            <div className="text-xs text-gray-500">
              {row?.jobSetup} • {row?.positionLevel}
            </div>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Expiration Date",
      selector: (row) => new Date(row.expirationDate).toDateString(),
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
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            className="text-primary font-semibold hover:bg-primary hover:text-primary-foreground"
          >
            View Applications
          </Button>
          <JobActions />
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="wrapper w-full flex items-center text-red-500 font-semibold py-6">
        Error: {error}
      </div>
    );

  const openJobsCount = data?.results || 0;
  const openJobs = data?.data?.openJobs || [];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <h2 className="text-lg text-gray-800 font-semibold">My Jobs</h2>
          <span className="text-sm text-gray-600">({openJobsCount})</span>
        </div>
      </div>
      {openJobs.length === 0 ? (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          No jobs found
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={openJobs}
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

export default MyJobs;
