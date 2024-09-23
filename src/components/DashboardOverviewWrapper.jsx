import CandidateOverview from "./candidates/CandidateOverview";
import EmployerOverview from "./employers/EmployerOverview";
import useAuth from "../hooks/useAuth";

const DashboardOverviewWrapper = () => {
  const { user } = useAuth();

  return (
    <section className="w-full">
      {user?.role === "job seeker" ? (
        <CandidateOverview />
      ) : (
        <EmployerOverview />
      )}
    </section>
  );
};

export default DashboardOverviewWrapper;
