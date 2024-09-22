import DataTable from "react-data-table-component";
import { customTableStyles } from "../../styles/customTableSyales";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const AppliedJobs = () => {
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
              <span>{row.title}</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-primary/10 text-primary ml-2">
                {row.jobType}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {row.location} • {row.salary}
            </div>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Date Applied",
      selector: (row) => row.dateApplied,
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

  // Data array
  const appliedJobs = [
    {
      id: 1,
      title: "Networking Engineer",
      company: "Upwork",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Remote",
      jobTypeColor: "#34D399",
      location: "Washington",
      salary: "$50k-80k/month",
      dateApplied: "Feb 2, 2019 15:28",
      status: "Active",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Dribbble",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Full Time",
      jobTypeColor: "#F472B6",
      location: "Dhaka",
      salary: "$20k-50k/month",
      dateApplied: "Dec 7, 2019 23:28",
      status: "Active",
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      company: "Apple",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Temporary",
      jobTypeColor: "#60A5FA",
      location: "Barisal",
      salary: "$10k-20k/month",
      dateApplied: "Feb 2, 2019 15:28",
      status: "Active",
    },
    {
      id: 4,
      title: "Visual Designer",
      company: "Microsoft",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Contract Base",
      jobTypeColor: "#818CF8",
      location: "Wisconsin",
      salary: "$50k-80k/month",
      dateApplied: "Dec 7, 2019 23:28",
      status: "Active",
    },
    {
      id: 5,
      title: "Marketing Officer",
      company: "Twitter",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Full Time",
      jobTypeColor: "#F472B6",
      location: "United States",
      salary: "$50k-80k/month",
      dateApplied: "Dec 4, 2019 21:42",
      status: "Active",
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "Facebook",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Full Time",
      jobTypeColor: "#F472B6",
      location: "North Dakota",
      salary: "$40k-60k/month",
      dateApplied: "Dec 30, 2019 07:53",
      status: "Active",
    },
    {
      id: 7,
      title: "Software Engineer",
      company: "Google",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Full Time",
      jobTypeColor: "#F472B6",
      location: "New York",
      salary: "$70k-90k/month",
      dateApplied: "Dec 30, 2019 05:18",
      status: "Active",
    },
    {
      id: 8,
      title: "Front End Developer",
      company: "Reddit",
      companyLogo: "/api/placeholder/40/40",
      jobType: "Full Time",
      jobTypeColor: "#F472B6",
      location: "Michigan",
      salary: "$50k-70k/month",
      dateApplied: "Mar 20, 2019 23:34",
      status: "Active",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-lg text-gray-800 font-semibold">Applied Jobs</h2>
        <span className="text-sm text-gray-600">(589)</span>
      </div>
      <DataTable
        columns={columns}
        data={appliedJobs}
        customStyles={customTableStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
        noHeader
      />
    </div>
  );
};

export default AppliedJobs;
