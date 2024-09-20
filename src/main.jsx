import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import App from "./App.jsx";
import FindJob from "./components/find-job/FindJob.jsx";
import Candidates from "./components/candidates/Candidates.jsx";
import JobDetailsWrapper from "./components/find-job/JobDetailsWrapper.jsx";
import FindEmployers from "./components/find-employers/FindEmployers.jsx";
import SignIn from "./components/SIgnIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ForgetPWd from "./components/ForgetPwd/ForgetPWd.jsx";
import DashboardWrapper from "./components/DashboardWrapper.jsx";
import AppliedJobs from "./components/candidates/AppliedJobs.jsx";
import FavoriteJobs from "./components/candidates/FavoriteJobs.jsx";
import JobAlert from "./components/candidates/JobAlert.jsx";
import DashboardOverviewWrapper from "./components/DashboardOverviewWrapper.jsx";
import DashboardSettingsWrapper from "./components/DashboardSettingsWrapper.jsx";
import EmployerProfile from "./components/employers/EmployerProfile.jsx";
import PostJob from "./components/employers/PostJob.jsx";
import MyJobs from "./components/employers/MyJobs.jsx";
import SavedCandidates from "./components/employers/SavedCandidates.jsx";
import AllCompanies from "./components/employers/AllCompanies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "find-job",
        element: <FindJob />,
      },
      {
        path: "find-job/:jobId",
        element: <JobDetailsWrapper />,
      },
      {
        path: "find-employers",
        element: <FindEmployers />,
      },
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "dashboard",
        element: <DashboardWrapper />,
        children: [
          {
            index: true,
            element: <DashboardOverviewWrapper />,
          },
          {
            path: "applied-jobs",
            element: <AppliedJobs />,
          },
          {
            path: "favorite-jobs",
            element: <FavoriteJobs />,
          },
          {
            path: "job-alert",
            element: <JobAlert />,
          },
          {
            path: "settings",
            element: <DashboardSettingsWrapper />,
          },
          {
            path: "employers-profile",
            element: <EmployerProfile />,
          },
          {
            path: "post-job",
            element: <PostJob />,
          },
          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "saved-candidates",
            element: <SavedCandidates />,
          },
          {
            path: "all-companies",
            element: <AllCompanies />,
          },
        ],
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPWd />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
