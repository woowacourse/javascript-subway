/* eslint-disable no-undef */
const ROUTES = Object.freeze(
  Object.entries({
    HOME: '/',
    STATIONS: '/stations',
    LINES: '/lines',
    SECTIONS: '/sections',
    LOGIN: '/login',
    SIGN_UP: '/signup',
    LOGOUT: '/logout',
  }).reduce((acc, [key, route]) => ({ ...acc, [key]: `${SUBPATH}${route}` }), {})
);

export default ROUTES;
