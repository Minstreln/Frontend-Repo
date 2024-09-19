import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import App from "./App.jsx";
import FindJob from "./components/find-job/FindJob.jsx";
import Employers from "./components/employers/Employers.jsx";
import Candidates from "./components/candidates/Candidates.jsx";
import SignIn from "./components/SIgnIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import ForgetPWd from "./components/ForgetPwd/ForgetPWd.jsx";

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
        path: "employers",
        element: <Employers />,
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
