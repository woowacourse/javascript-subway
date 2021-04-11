/* eslint-disable no-undef */
import RAW_PATHNAMES from './rawPathnames.js';

const RAW_PATHNAME_ENTRIES = Object.entries(RAW_PATHNAMES);
const PATHNAME_ENTRIES = RAW_PATHNAME_ENTRIES.map(([key, route]) => [key, `${SUBPATH}${route}`]);

export const PATHNAMES = Object.freeze(Object.fromEntries(PATHNAME_ENTRIES));

const { HOME, STATIONS, LINES, SECTIONS, LOGIN, LOGOUT, SIGN_UP } = PATHNAMES;

export const ACCESSIBLE_PATHNAMES = (isLoggedIn) =>
  isLoggedIn ? [HOME, STATIONS, LINES, SECTIONS, LOGOUT] : [HOME, LOGIN, SIGN_UP];
