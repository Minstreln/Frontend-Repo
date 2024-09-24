import CandidateSettings from "./candidates/CandidateSettings";
import EmployerSettings from "./employers/EmployerSettings";
import useAuth from "../hooks/useAuth";
import { userRole } from "../lib/constants";

const DashboardSettingsWrapper = () => {
  const { user } = useAuth();

  return (
    <section className="w-full">
      {user?.role === userRole.jobSeeker ? (
        <CandidateSettings />
      ) : (
        <EmployerSettings />
      )}
    </section>
  );
};

export default DashboardSettingsWrapper;
