/* eslint-disable no-undef */
import RAW_PATHNAMES from './rawPathnames.js';

const PATHNAMES = Object.freeze(
  Object.entries(RAW_PATHNAMES).reduce(
    (acc, [key, route]) => ({
      ...acc,
      [key]: `${SUBPATH}${route}`,
    }),
    {}
  )
);

const { HOME, STATIONS, LINES, SECTIONS, LOGIN, LOGOUT, SIGN_UP } = PATHNAMES;

const ACCESSIBLE_PATHNAMES = (isLoggedIn) =>
  isLoggedIn ? [HOME, STATIONS, LINES, SECTIONS, LOGOUT] : [HOME, LOGIN, SIGN_UP];

export { PATHNAMES, ACCESSIBLE_PATHNAMES };
