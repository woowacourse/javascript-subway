/* eslint-disable no-undef */
import { isLoggedIn } from '../auth/index.js';
import RAW_PATHNAMES from './rawPathnames.js';

const PATHNAME_ENTRIES = Object.entries(RAW_PATHNAMES).map(([key, route]) => [key, `${SUBPATH}${route}`]);

export const PATHNAMES = Object.freeze(Object.fromEntries(PATHNAME_ENTRIES));

const pathsWithoutAuth = [PATHNAMES.HOME, PATHNAMES.LOGIN, PATHNAMES.SIGN_UP];

const pathsWithAuth = Object.values(PATHNAMES).filter((pathname) => !pathsWithoutAuth.includes(pathname));

export const ACCESSIBLE_PATHNAMES = () => (isLoggedIn() ? pathsWithAuth : pathsWithoutAuth);
