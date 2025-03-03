import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },
  // {
  //   path: '/g',
  //   element: <GuestLayout/>,
  //   children: [
  //     {
  //       path: '/login',
  //       element: <Login/>
  //     },
  //     {
  //       path: '/signup',
  //       element: <Signup/>
  //     }
  //   ]
  // },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
