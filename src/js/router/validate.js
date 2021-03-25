import { hasPropertyValue, reportError, showNotification } from '../utils/index.js';
import { PATHNAMES, ACCESSIBLE_PATHNAMES, ROUTING_MESSAGES } from '../constants/index.js';
import { isLoggedIn } from '../auth/index.js';

export default function getValidPathname(pathname) {
  const currentPathname = window.location.pathname;

  try {
    if (!isValidPathname(pathname)) {
      showNotification(ROUTING_MESSAGES.PATHNAME_IS_INVALID(pathname));
      return currentPathname;
    }

    if (!hasAccessRight(pathname)) {
      showNotification(ROUTING_MESSAGES.YOU_HAVE_NO_ACCESS_RIGHT);
      return currentPathname;
    }
  } catch (error) {
    reportError({
      messageToLog: error.message,
      messageToUser: ROUTING_MESSAGES.ROUTING_HAS_BEEN_FAILED,
    });
    return currentPathname;
  }

  return pathname;
}

function hasAccessRight(pathname) {
  return ACCESSIBLE_PATHNAMES(isLoggedIn()).includes(pathname);
}

function isValidPathname(pathname) {
  return hasPropertyValue(PATHNAMES, pathname);
}
