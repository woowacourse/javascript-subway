import { $, hasPropertyValue } from '../utils/index.js';
import { ROUTES, TITLES } from '../constants/index.js';
import { render, renderHeader } from '../views/index.js';
import { logout, isLoggedIn } from '../auth/index.js';

const $header = $('header');
const $main = $('main');

export function handleWindowPopstate({ target }) {
  const { pathname } = target.location;

  renderContent(pathname);
}

export function handleLinkClick(event) {
  const $anchor = event.target.closest('a');

  if ($anchor === null || isDifferentOrigin($anchor.origin)) {
    return;
  }

  event.preventDefault();

  const { pathname } = $anchor;

  if (pathname === ROUTES.LOGOUT) {
    logout();
  }

  goTo(pathname);
}

export function goTo(requestedPathname) {
  const pathname = getValidPathname(requestedPathname);

  renderHeader($header);
  renderContent(pathname);
  applyNewPath(pathname);
}

function getValidPathname(pathname) {
  try {
    validateAuthentication(pathname);
    validatePathname(pathname);

    return pathname;
  } catch (error) {
    // TODO: 잘못된 경로일 경우 스낵바 표시
    // eslint-disable-next-line no-console
    console.error(error);

    return ROUTES.HOME;
  }
}

function renderContent(pathname) {
  // TODO: API요청으로 데이터 가져온 후 인자로 isChangedData에 전달
  if (!isChangedData()) {
    return;
  }

  render[pathname]($main);
}

function applyNewPath(pathname) {
  if (!isChangedPathname(pathname)) {
    return;
  }

  window.history.pushState(null, null, pathname);
  document.title = TITLES[pathname];
}

function validatePathname(pathname) {
  if (hasPropertyValue(ROUTES, pathname)) {
    return;
  }

  throw new Error(`${pathname}은 잘못된 경로입니다.`);
}

function isDifferentOrigin(targetOrigin) {
  return window.location.origin !== targetOrigin;
}

function isChangedPathname(pathname) {
  return window.location.pathname !== pathname;
}

const allowedRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.LOGOUT, ROUTES.SIGN_UP];

function validateAuthentication(pathname) {
  if (allowedRoutes.includes(pathname)) {
    return;
  }

  if (!isLoggedIn()) {
    throw new Error('로그인 전에는 메뉴를 열람하실 수 없습니다.');
  }
}

// TODO: API요청으로 데이터 가져온 후 변경된 데이터인지 확인하는 함수로 수정
function isChangedData() {
  return true;
}
