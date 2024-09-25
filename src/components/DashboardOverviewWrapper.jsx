import CandidateOverview from "./candidates/CandidateOverview";
import EmployerOverview from "./employers/EmployerOverview";
import useAuth from "../hooks/useAuth";
import { userRole } from "../lib/constants";

const DashboardOverviewWrapper = () => {
  const { user } = useAuth();

  return (
    <section className="w-full">
      {user?.role === userRole.jobSeeker ? (
        <CandidateOverview />
      ) : (
        <EmployerOverview />
      )}
    </section>
  );
};

export default DashboardOverviewWrapper;
