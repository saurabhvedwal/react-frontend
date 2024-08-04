import { memo, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context";
import axiosClient, { axiosClientBasic } from "../axios-client.js";
import Header from "../components/molecules/Header";
import constants from "../constants";

const DefaultLayout = () => {
  const {
    isLoggedIn,
    clearAuth,
    auth: user,
    setAuth,
    setIsLoggedIn,
  } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to={constants.APP_ROUTES.LOGIN} />;
  }
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoggedIn, "Dashboard");

  const onLogout = (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    axiosClientBasic.post(constants.APP_ROUTES.LOGOUT).then(() => {
      clearAuth();
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const fetchAuthUser = () => {
    setIsLoading(true);
    axiosClient
      .get(constants.API_ROUTES.USER_ROUTE)
      .then(({ data }) => {
        setAuth(data.data);
        setIsLoggedIn(true);
        sessionStorage.setItem(
          constants.SESSION_STORAGE.USER_KEY,
          JSON.stringify(data.data)
        );
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 401) {
          clearAuth();
        }
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div id="defaultLayout">
      <div className="content">
        <Header user={user} isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main>
          <Outlet user={user} />
        </main>
      </div>
    </div>
  );
};

export default memo(DefaultLayout);
