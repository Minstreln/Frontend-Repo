import EmployersDashboard from "./employers/EmployersDashboard";
import CandidateDashboard from "./candidates/CandidateDashboard";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
// import useAuth from "../hooks/useAuth";

const DashboardWrapper = () => {
  // const { user } = useAuth();
  const { user } = useContext(AuthContext);

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full mb-20 border-b border-b-gray-200">
      {user === "job seeker" ? <CandidateDashboard /> : <EmployersDashboard />}
    </section>
  );
};

export default DashboardWrapper;
