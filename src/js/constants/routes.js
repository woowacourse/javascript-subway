/* eslint-disable no-undef */
import RAW_ROUTES from './rawRoutes.js';

const ROUTES = Object.freeze(
  Object.entries(RAW_ROUTES).reduce(
    (acc, [key, route]) => ({
      ...acc,
      [key]: `${SUBPATH}${route}`,
    }),
    {}
  )
);

export default ROUTES;
