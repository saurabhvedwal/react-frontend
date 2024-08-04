import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import constants from "../constants";

const Dashboard = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to={constants.APP_ROUTES.LOGIN} />;
  }

  return (
    <div>
      <h1>Dahsboard</h1>
      <p>
        This is views/Dahsboard.jsx. You can add anything you want here. The
        user is logged in! Cool!
      </p>
    </div>
  );
};

export default Dashboard;
