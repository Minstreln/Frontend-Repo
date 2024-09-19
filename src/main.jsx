import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import App from "./App.jsx";
import FindJob from "./components/find-job/FindJob.jsx";
import Candidates from "./components/candidates/Candidates.jsx";
<<<<<<< HEAD
import JobDetailsWrapper from "./components/find-job/JobDetailsWrapper.jsx";
import FindEmployers from "./components/find-employers/FindEmployers.jsx";
=======
import SignIn from "./components/SIgnIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ForgetPWd from "./components/ForgetPwd/ForgetPWd.jsx";
>>>>>>> David

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
        path: "signIn",
        element: <SignIn/>
      },
      {
        path: "signUp",
        element: <SignUp/>
      },
      {
        path: "forget-password",
        element: <ForgetPWd/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
