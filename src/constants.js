const constants = {
  API_ROUTES: {
    CSRF_ROUTE: '/sanctum/csrf-cookie',
    LOGIN_ROUTE: 'login',
    USER_ROUTE: 'user',
  },
  APP_ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
  },
  API_ROUTE_PREFIX: '/api/v1',
  XSRF_COOKIE_KEY: 'XSRF-TOKEN',
  USER_COOKIE_KEY: 'laravel_backend_session',
  SESSION_STORAGE: {
    USER_KEY: 'user',
  },
};

export default constants;
