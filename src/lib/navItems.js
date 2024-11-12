import {
  BookmarkCheck,
  Briefcase,
  BriefcaseBusiness,
  BriefcaseIcon,
  LayoutDashboard,
  UserCircleIcon,
} from "lucide-react";

export const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Find Job",
    path: "/find-job",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];

export const candidatesSidebarNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "" },
  { name: "Applied Jobs", icon: Briefcase, href: "applied-jobs" },
  { name: "Saved Jobs", icon: BookmarkCheck, href: "saved-jobs" },
  {
    name: "Candidate Profile",
    icon: UserCircleIcon,
    href: "candidate-profile",
  },
];

export const employersSidebarNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "" },

  { name: "Post Job", icon: BriefcaseBusiness, href: "post-job" },
  { name: "My Jobs", icon: BriefcaseIcon, href: "my-jobs" },
  {
    name: "Job Applications",
    icon: BookmarkCheck,
    href: "job-applications",
  },
  {
    name: "Employer Profile",
    icon: UserCircleIcon,
    href: "employer-profile",
  },
];
