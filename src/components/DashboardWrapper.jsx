import EmployersDashboard from "./employers/EmployersDashboard";
import CandidateDashboard from "./candidates/CandidateDashboard";
import useAuth from "../hooks/useAuth";
import { userRole } from "../lib/constants";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";

const DashboardWrapper = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-6">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="w-full mb-20 border-b border-b-gray-200">
      {user?.role === userRole.jobSeeker ? (
        <CandidateDashboard>
          <Outlet />
        </CandidateDashboard>
      ) : (
        <EmployersDashboard>
          <Outlet />
        </EmployersDashboard>
      )}
    </section>
  );
};

export default DashboardWrapper;
