import { Outlet } from "react-router-dom";
import SidebarNav from "../SidebarNav";
import { employersSidebarNavItems } from "../../lib/navItems";
import useCurrentPage from "../../hooks/useCurrentPage";
import MobileSidebarNav from "../MobileSidebarNav";

const EmployersDashboard = () => {
  const { currentPage } = useCurrentPage();

  return (
    <div className="wrapper">
      <div className="w-full grid grid-cols-1 lg:grid-cols-5">
        <div className="hidden lg:block col-span-1 border-r border-r-gray-200 h-[80vh] text-gray-600">
          <SidebarNav
            title={"Employers Dashboard"}
            activeItem={currentPage}
            navItems={employersSidebarNavItems}
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

export default EmployersDashboard;
