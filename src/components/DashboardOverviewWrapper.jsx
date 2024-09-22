import { useContext } from "react";
// import useAuth from "../hooks/useAuth";
import CandidateOverview from "./candidates/CandidateOverview";
import EmployerOverview from "./employers/EmployerOverview";
import AuthContext from "./context/AuthContext";

const DashboardOverviewWrapper = () => {
  // const { user } = useAuth();
  const { user } = useContext(AuthContext);

  if (!user) {
    // refactor to redirect user to login page
    return <div>Loading...</div>;
  }

  console.log(user)
  return (
    <section className="w-full">
      
      {user === "job seeker" ? <CandidateOverview />: <EmployerOverview /> }
    </section>
  );
};

export default DashboardOverviewWrapper;
