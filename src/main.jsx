import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import App from "./App.jsx";
import FindJob from "./components/find-job/FindJob.jsx";
import JobDetailsWrapper from "./components/find-job/JobDetailsWrapper.jsx";
import FindEmployers from "./components/find-employers/FindEmployers.jsx";
import SignIn from "./components/SIgnIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ForgetPWd from "./components/ForgetPwd/ForgetPWd.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
import DashboardWrapper from "./components/DashboardWrapper.jsx";
import AppliedJobs from "./components/candidates/applied-jobs/AppliedJobs.jsx";
import SavedJobs from "./components/candidates/saved-jobs/SavedJobs.jsx";
import DashboardOverviewWrapper from "./components/DashboardOverviewWrapper.jsx";
import EmployerProfile from "./components/employers/EmployerProfile.jsx";
import PostJob from "./components/employers/PostJob.jsx";
import MyJobs from "./components/employers/MyJobs.jsx";
import SavedCandidates from "./components/employers/SavedCandidates.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import CandidateProfile from "./components/candidates/candidate-profile/CandidateProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<App />} />
      <Route path="find-job" element={<FindJob />}></Route>
      <Route path="find-job/:jobId" element={<JobDetailsWrapper />} />
      <Route path="find-employers" element={<FindEmployers />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forget-password" element={<ForgetPWd />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoutes>
            <DashboardWrapper />
          </ProtectedRoutes>
        }
      >
        <Route index element={<DashboardOverviewWrapper />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="candidate-profile" element={<CandidateProfile />} />
        <Route path="employer-profile" element={<EmployerProfile />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="my-jobs" element={<MyJobs />} />
        <Route path="saved-candidates" element={<SavedCandidates />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
