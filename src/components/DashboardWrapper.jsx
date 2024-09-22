import EmployersDashboard from "./employers/EmployersDashboard";
import CandidateDashboard from "./candidates/CandidateDashboard";
import useAuth from "../hooks/useAuth";

const DashboardWrapper = () => {
  const { user } = useAuth();

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full mb-20 border-b border-b-gray-200">
      {user.type === "employer" ? (
        <EmployersDashboard />
      ) : (
        <CandidateDashboard />
      )}
    </section>
  );
};

export default DashboardWrapper;
