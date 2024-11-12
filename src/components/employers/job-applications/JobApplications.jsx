import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../styles/customTableSyales";

const JobApplications = () => {
  const applicationsCount = 0;
  const applications = [];
  const columns = [];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <h2 className="text-lg text-gray-800 font-semibold">
            My Applications
          </h2>
          <span className="text-sm text-gray-600">({applicationsCount})</span>
        </div>
      </div>
      {applications.length === 0 ? (
        <div className="wrapper w-full flex items-center text-primary font-semibold py-6">
          No jobs found
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={applications}
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

export default JobApplications;
