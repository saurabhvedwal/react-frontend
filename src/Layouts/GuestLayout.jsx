import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context";
import Header from "../components/molecules/Header";
import constants from "../constants";

const GuestLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to={constants.APP_ROUTES.DASHBOARD} />;
  }

  return (
    <div id="guestLayout">
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
