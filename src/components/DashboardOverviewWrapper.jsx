import useAuth from "../hooks/useAuth";
import CandidateOverview from "./candidates/CandidateOverview";
import EmployerOverview from "./employers/EmployerOverview";

const DashboardOverviewWrapper = () => {
  const { user } = useAuth();

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }
  return (
    <section className="w-full">
      {user.type === "employer" ? <EmployerOverview /> : <CandidateOverview />}
    </section>
  );
};

export default DashboardOverviewWrapper;
