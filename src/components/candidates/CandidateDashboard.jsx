import { Outlet } from "react-router-dom";
import SidebarNav from "../SidebarNav";
import { candidatesSidebarNavItems } from "../../lib/navItems";
import MobileSidebarNav from "../MobileSidebarNav";
import useCurrentPage from "../../hooks/useCurrentPage";

const CandidateDashboard = () => {
  const { currentPage } = useCurrentPage();

  return (
    <div className="wrapper">
      <div className="w-full grid grid-cols-1 lg:grid-cols-5">
        <div className="hidden lg:block col-span-1 border-r border-r-gray-200 h-full text-gray-600">
          <SidebarNav
            title={"Candidate Dashboard"}
            activeItem={currentPage}
            navItems={candidatesSidebarNavItems}
          />
        </div>
        <div className="relative py-8 lg:col-span-4 lg:pt-12 lg:pl-12">
          <div className="absolute top-4 right-0 z-20 lg:hidden">
            <MobileSidebarNav />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
