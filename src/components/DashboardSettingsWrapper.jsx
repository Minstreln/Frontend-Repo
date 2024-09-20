import useAuth from "../hooks/useAuth";
import CandidateSettings from "./candidates/CandidateSettings";
import EmployerSettings from "./employers/EmployerSettings";

const DashboardSettingsWrapper = () => {
  const { user } = useAuth();

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }
  return (
    <section className="w-full">
      {user.type === "employer" ? <EmployerSettings /> : <CandidateSettings />}
    </section>
  );
};

export default DashboardSettingsWrapper;
