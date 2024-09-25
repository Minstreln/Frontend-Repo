import {
  BookmarkCheck,
  Briefcase,
  BriefcaseBusiness,
  BriefcaseIcon,
  Building,
  LayoutDashboard,
  Settings,
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
    name: "Find Employers",
    path: "/find-employers",
  },
  {
    name: "Candidates",
    path: "/candidates",
  },
];

export const candidatesSidebarNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "" },
  { name: "Applied Jobs", icon: Briefcase, href: "applied-jobs" },
  { name: "Saved Jobs", icon: BookmarkCheck, href: "saved-jobs" },
  { name: "Settings", icon: Settings, href: "settings" },
];

export const employersSidebarNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "" },
  {
    name: "Employers Profile",
    icon: UserCircleIcon,
    href: "employers-profile",
  },
  { name: "Post Job", icon: BriefcaseBusiness, href: "post-job" },
  { name: "My Jobs", icon: BriefcaseIcon, href: "my-jobs" },
  {
    name: "Saved Candidates",
    icon: BookmarkCheck,
    href: "saved-candidates",
  },
  { name: "All Companies", icon: Building, href: "all-companies" },
  { name: "Settings", icon: Settings, href: "settings" },
];
