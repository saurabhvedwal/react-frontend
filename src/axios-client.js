import axios from "axios";
import Cookies from "js-cookie";

import config from "./config";
import constants from "./constants";
import { clearBrowserStorage } from "./utils";

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: `${config.apiBaseUrl}${constants.API_ROUTE_PREFIX}`,
});

const axiosClientBasic = axios.create({
  baseURL: `${config.apiBaseUrl}`,
});

const onRequest = (config) => {
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if (
    (config.method == "post" ||
      config.method == "put" ||
      config.method == "delete") &&
    /* other methods you want to add here */
    !Cookies.get(constants.XSRF_COOKIE_KEY)
  ) {
    return setCSRFToken().then((response) => config);
  }
  return config;
};

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
  return axiosClientBasic.get(constants.API_ROUTES.CSRF_ROUTE); // resolves to '/api/csrf-cookie'.
};

const onResponseSuccess = (response) => {
  return response;
};

const onResponseError = (error) => {
  const { response } = error;
    console.log(error, response);
    if (response.status === 401) {
      clearBrowserStorage();
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
};

// Request interceptor. Runs before your request reaches the server
axiosClient.interceptors.request.use(onRequest, null);
axiosClientBasic.interceptors.request.use(onRequest, null);
axiosClient.interceptors.response.use(onResponseSuccess, onResponseError);
axiosClientBasic.interceptors.response.use(onResponseSuccess, onResponseError);

export {
  axiosClientBasic
};
export default axiosClient;