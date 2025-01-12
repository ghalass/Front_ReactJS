import { createBrowserRouter } from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Sites from "./pages/sites/Sites";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Typeparcs from "./pages/Typeparcs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/configs/sites",
        element: <Sites />,
      },
      {
        path: "/configs/typeparcs",
        element: <Typeparcs />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  { path: "/", element: <Home /> },
]);

export default router;
