import { useContext } from "react";
// import useAuth from "../hooks/useAuth";
import CandidateSettings from "./candidates/CandidateSettings";
import EmployerSettings from "./employers/EmployerSettings";
import AuthContext from "./context/AuthContext";

const DashboardSettingsWrapper = () => {
  // const { user } = useAuth();
  const { user } = useContext(AuthContext);

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }
  return (
    <section className="w-full">
      {user === "job seeker" ? <CandidateSettings /> : <EmployerSettings /> }
    </section>
  );
};

export default DashboardSettingsWrapper;
