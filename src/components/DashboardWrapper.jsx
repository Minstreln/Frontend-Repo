import EmployersDashboard from "./employers/EmployersDashboard";
import CandidateDashboard from "./candidates/CandidateDashboard";
import useAuth from "../hooks/useAuth";

const DashboardWrapper = () => {
  const { user } = useAuth();

  return (
    <section className="w-full mb-20 border-b border-b-gray-200">
      {user?.role === "job seeker" ? (
        <CandidateDashboard />
      ) : (
        <EmployersDashboard />
      )}
    </section>
  );
};

export default DashboardWrapper;
