import {
  ArrowRight,
  Briefcase,
  Check,
  User,
  UserCircleIcon,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../../styles/customTableSyales";
import { Link } from "react-router-dom";
import { useFetchAppliedJobs, useFetchSavedJobs } from "../../../hooks/useJobs";
import Loading from "../../Loading";

const CandidateOverview = () => {
  const { user } = useAuth();

  const { data: appliedJobs, isLoading: applyJobsLoading } =
    useFetchAppliedJobs();
  const { data: savedJobs } = useFetchSavedJobs();

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
      width: "120px",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-800 font-semibold text-2xl">
          Welcome back, {user?.firstName} {user?.lastName}
        </h1>
        <span className="text-gray-600">Here are your recent activities.</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-primary">
                {appliedJobs?.results}
              </span>
              <span className="text-sm text-gray-500">Applied Jobs</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <Briefcase className="text-primary" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-yellow-500">
                {savedJobs?.results}
              </span>
              <span className="text-sm text-gray-500">Saved Jobs</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <User className="text-yellow-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-5 rounded-md bg-red-500 shadow text-gray-100 ">
        <div className="flex flex-row gap-2 items-center">
          <UserCircleIcon className="h-16 w-16" />
          <div className="w-full flex flex-col">
            <span className="text-lg font-semibold">
              Your profile editing is not completed.
            </span>
            <span>
              Complete your profile editing & build your custom Resume
            </span>
          </div>
        </div>
        <Link to={"/dashboard/candidate-profile"}>
          <Button
            variant="secondary"
            size="lg"
            className="font-semibold text-destructive hover:bg-secondary/90"
          >
            Edit Profile <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-gray-800 font-semibold">
            Recently Applied
          </h2>
          <Link to={"/dashboard/applied-jobs"}>
            <Button
              variant="secondary"
              className="text-primary hover:text-primary/90"
            >
              View all <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {applyJobsLoading && <Loading />}

        {appliedJobs && appliedJobs.data.applications.length === 0 && (
          <div className="w-full flex items-center justify-center p-4">
            <span className="text-gray-600">No data found</span>
          </div>
        )}

        {appliedJobs && appliedJobs.data.applications.length > 0 && (
          <DataTable
            columns={columns}
            data={appliedJobs.data.applications}
            customStyles={customTableStyles}
            pagination
            paginationPerPage={3}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateOverview;
