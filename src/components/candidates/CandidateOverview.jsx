import {
  ArrowRight,
  Bell,
  Briefcase,
  Check,
  User,
  UserCircleIcon,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../styles/customTableSyales";

const CandidateOverview = () => {
  const { user } = useAuth();
  const recentlyAppliedJobs = [
    {
      title: "Networking Engineer",
      type: "Remote",
      location: "Washington",
      salary: "$50k-80k/month",
      date: "Feb 2, 2019 15:38",
      status: "Active",
    },
    {
      title: "Product Designer",
      type: "Full Time",
      location: "Dhaka",
      salary: "$20k-50k/month",
      date: "Dec 7, 2019 13:08",
      status: "Active",
    },
    {
      title: "Junior Graphic Designer",
      type: "Temporary",
      location: "Barisal",
      salary: "$10k-20k/month",
      date: "Feb 2, 2019 15:38",
      status: "Active",
    },
    {
      title: "Visual Designer",
      type: "Contract Base",
      location: "Moscow",
      salary: "$50k-80k/month",
      date: "Dec 7, 2019 23:28",
      status: "Active",
    },
  ];

  const columns = [
    {
      name: "Job",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="flex items-center py-2">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full" />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.title}</div>
            <div className="text-sm text-gray-500">
              {row.type} • {row.location} • {row.salary}
            </div>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Date Applied",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Check className="h-4 w-4 text-[#0BA02C]" />
          <span className="px-2 py-[2px] inline-flex text-xs leading-5 font-semibold rounded bg-[#E7F6EA] text-[#0BA02C]">
            {row.status}
          </span>
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
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-800 font-semibold text-2xl">
          {user?.message}
        </h1>
        <span className="text-gray-600">
          Here is your daily activities and job alerts
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold">589</span>
              <span className="text-sm text-gray-500">Applied Jobs</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <Briefcase className="text-blue-500" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold">238</span>
              <span className="text-sm text-gray-500">Favorite Jobs</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <User className="text-yellow-500" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-0">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold">574</span>
              <span className="text-sm text-gray-500">Job Alerts</span>
            </div>
            <div className="h-12 w-12 bg-white flex items-center justify-center rounded-md">
              <Bell className="text-green-500" size={24} />
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
        <Button
          variant="secondary"
          size="lg"
          className="font-semibold text-destructive"
        >
          Edit Profile <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-gray-800 font-semibold">
            Recently Applied
          </h2>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/90"
          >
            View all <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={recentlyAppliedJobs}
          customStyles={customTableStyles}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          noHeader
        />
      </div>
    </div>
  );
};

export default CandidateOverview;
