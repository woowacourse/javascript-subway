import { $, hasPropertyValue } from '../utils/index.js';
import { ROUTES, TITLES } from '../constants/index.js';
import { render, renderHeader } from '../views/index.js';
import { logout } from '../auth.js';

const $header = $('header');
const $main = $('main');

export function handleWindowPopstate({ target }) {
  const { pathname } = target.location;

  renderByPathname(pathname);
}

export function handleLinkClick(event) {
  const { target: $target } = event;
  const $anchor = $target.closest('a');

  if (!$anchor) {
    return;
  }

  const { origin, pathname } = $anchor;

  if (!isSameOrigin(origin)) {
    return;
  }

  event.preventDefault();

  if (pathname === ROUTES.LOGOUT) {
    logout();
  }

  goTo(pathname);
}

export function goTo(pathname) {
  if (isChangedPathname(pathname)) {
    window.history.pushState(null, null, pathname);
    document.title = TITLES[pathname];
  }

  renderHeader($header);
  renderByPathname(pathname);
}

function renderByPathname(pathname) {
  try {
    validatePathname(pathname);

    // TODO: API요청으로 데이터 가져온 후 인자로 isChangedData에 전달
    if (isChangedData()) {
      render[pathname]($main);
    }
  } catch (error) {
    // TODO: 잘못된 경로일 경우 스낵바 표시
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function validatePathname(pathname) {
  if (hasPropertyValue(ROUTES, pathname)) {
    return;
  }

  throw new Error(`${pathname}은 잘못된 경로입니다.`);
}

function isSameOrigin(targetOrigin) {
  return window.location.origin === targetOrigin;
}

function isChangedPathname(pathname) {
  return window.location.pathname !== pathname;
}

// TODO: API요청으로 데이터 가져온 후 변경된 데이터인지 확인하는 함수로 수정
function isChangedData() {
  return true;
}
