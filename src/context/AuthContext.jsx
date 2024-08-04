import { createContext, useEffect, useState } from "react";
import constants from "../constants";
import Cookies from "js-cookie";
import { clearBrowserStorage } from "../utils";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clearAuth = () => {
    setAuth(null);
    setIsLoggedIn(false);
    clearBrowserStorage();
  };

  useEffect(() => {
    if (!Cookies.get(constants.XSRF_COOKIE_KEY)) {
      clearAuth();
    } else {
      setIsLoggedIn(true);
      const user = sessionStorage.getItem(constants.SESSION_STORAGE.USER_KEY);
      if (user) {
        setAuth(JSON.parse(user));
      }
    }
  }, []);

  console.log({ userInfo: auth, isLoggedIn });

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
