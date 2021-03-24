import getValidPathname from './validate.js';
import { render, renderContent } from '../components/index.js';
import { logout } from '../auth/index.js';
import { PATHNAMES } from '../constants/index.js';

export function handleWindowPopstate({ target }) {
  const { pathname } = target.location;

  // TODO: 로그인 여부 validation 필요
  // 1. 로그인 여부 O: 역 관리, 노선 관리, 구간 관리에 접근 불가능
  // 2. 로그인 여부 X:  로그인 화면, 회원가입 화면에 접근 불가능
  renderContent(pathname);
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
