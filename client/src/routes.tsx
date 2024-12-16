import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { AuthLayout } from "./pages/_layout/auth";
import { Gyms } from "./pages/app/gyms/gyms";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { Error } from "./pages/error";
import { NotFound } from "./pages/not-found";
import { CheckIns } from "./pages/app/check-ins/check-ins";
import { Profile } from "./pages/app/profile/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Navigate to="/gyms" replace />,
      },
      {
        path: "/gyms",
        element: <Gyms />,
      },
      {
        path: "/check-ins",
        element: <CheckIns />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
