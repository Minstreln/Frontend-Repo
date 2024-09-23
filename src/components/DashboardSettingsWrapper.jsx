import CandidateSettings from "./candidates/CandidateSettings";
import EmployerSettings from "./employers/EmployerSettings";
import useAuth from "../hooks/useAuth";

const DashboardSettingsWrapper = () => {
  const { user } = useAuth();

  return (
    <section className="w-full">
      {user?.role === "job seeker" ? (
        <CandidateSettings />
      ) : (
        <EmployerSettings />
      )}
    </section>
  );
};

export default DashboardSettingsWrapper;
