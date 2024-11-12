import { ArrowRight, Briefcase, Check, User } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Card, CardContent } from "../../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../styles/customTableSyales";
import Loading from "../../Loading";
import { useFetchRecruiterOpenJobs } from "../../../hooks/useJobs";

const EmployerOverview = () => {
  const { user } = useAuth();
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
        <Button
          variant="secondary"
          size="sm"
          className="text-primary font-semibold hover:bg-primary hover:text-primary-foreground"
        >
          View Applications
        </Button>
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
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-gray-800 font-semibold text-2xl">
          Welcome back, {user?.firstName} {user?.lastName}
        </h1>
        <span className="text-primary text-lg font-semibold">
          Role: <span className="capitalize font-medium">{user?.role}</span>
        </span>
        <span className="text-gray-600 pt-2">
          Here are your recent activities.
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-primary">
                {openJobsCount}
              </span>
              <span className="text-sm text-gray-500">Open Jobs</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <Briefcase className="text-primary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-yellow-500">{12}</span>
              <span className="text-sm text-gray-500">Job Applications</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <User className="text-yellow-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-gray-800 font-semibold">
            Recently Posted Jobs
          </h2>
          <Link to={"/dashboard/my-jobs"}>
            <Button
              variant="secondary"
              className="text-primary hover:text-primary/90"
            >
              View all <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {openJobs.length === 0 ? (
          <div className="w-full flex items-center justify-center p-4">
            <span className="text-gray-600">No data found</span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={openJobs}
            customStyles={customTableStyles}
            pagination
            paginationPerPage={5}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerOverview;
