import Cookies from "js-cookie";
import constants from "./constants";

export const setCookieWithExpiryInMinutes = (name, val, inMinutes) => {
  const minutes = new Date(new Date().getTime() + inMinutes * 60 * 1000);
  Cookies.set(name, val, {
    expires: minutes,
  });
};

export const clearBrowserStorage = () => {
  Cookies.remove(constants.XSRF_COOKIE_KEY);
  Cookies.remove(constants.USER_COOKIE_KEY);
  sessionStorage.removeItem(constants.SESSION_STORAGE.USER_KEY);
};
