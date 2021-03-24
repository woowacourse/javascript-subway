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

export default PATHNAMES;
