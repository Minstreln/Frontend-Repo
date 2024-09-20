import { PersonIcon } from "@radix-ui/react-icons";
import {
  Bell,
  BookmarkCheck,
  Briefcase,
  BriefcaseBusiness,
  BriefcaseIcon,
  Building,
  LayoutDashboard,
  Settings,
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
  { name: "Favorite Jobs", icon: BookmarkCheck, href: "favorite-jobs" },
  { name: "Job Alert", icon: Bell, href: "job-alert", badge: "09" },
  { name: "Settings", icon: Settings, href: "settings" },
];

export const employersSidebarNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "" },
  {
    name: "Employers Profile",
    icon: PersonIcon,
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
