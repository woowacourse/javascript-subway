import getValidPathname from './validate.js';
import { render, renderContent } from '../components/index.js';
import { logout } from '../auth/index.js';
import { PATHNAMES } from '../constants/index.js';

export function handleWindowPopstate({ target }) {
  const { pathname } = target.location;

  renderContent(getValidPathname(pathname));
}

export function handleLinkClick(event) {
  const $anchor = event.target.closest('a');

  if ($anchor === null || isDifferentOrigin($anchor.origin)) {
    return;
  }

  event.preventDefault();

  const { pathname } = $anchor;

  if (pathname === PATHNAMES.LOGOUT) {
    logout();
    goTo(PATHNAMES.HOME);
    return;
  }

  goTo(getValidPathname(pathname));
}

export function goTo(pathname) {
  addPathnameToBrowserHistory(pathname);
  render(pathname);
}

function addPathnameToBrowserHistory(pathname) {
  if (!isChangedPathname(pathname)) {
    return;
  }

  window.history.pushState(null, null, pathname);
}

function isDifferentOrigin(targetOrigin) {
  return window.location.origin !== targetOrigin;
}

function isChangedPathname(pathname) {
  return window.location.pathname !== pathname;
}
