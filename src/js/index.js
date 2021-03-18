import { $, hasPropertyValue } from './utils/index.js';
import { ROUTES } from './constants/index.js';
import {
  HEADER_TEMPLATE,
  STATIONS_TEMPLATE,
  LINES_TEMPLATE,
  SECTIONS_TEMPLATE,
  LOGIN_TEMPLATE,
  SIGN_UP_TEMPLATE,
} from './templates/index.js';

const $header = $('header');
$header.innerHTML = HEADER_TEMPLATE;

const $main = $('main');
const renderStations = () => {
  $main.innerHTML = STATIONS_TEMPLATE;
};

const renderLines = () => {
  $main.innerHTML = LINES_TEMPLATE;
};

const renderSections = () => {
  $main.innerHTML = SECTIONS_TEMPLATE;
};

const renderLogin = () => {
  $main.innerHTML = LOGIN_TEMPLATE;
};

const renderSignUp = () => {
  $main.innerHTML = SIGN_UP_TEMPLATE;
};

const render = {
  [ROUTES.STATIONS]: renderStations,
  [ROUTES.LINES]: renderLines,
  [ROUTES.SECTIONS]: renderSections,
  [ROUTES.LOGIN]: renderLogin,
  [ROUTES.SIGN_UP]: renderSignUp,
};

const isSameOrigin = (targetOrigin) => window.location.origin === targetOrigin;
const isChangedPathname = (pathname) => window.location.pathname !== pathname;
// TODO: API요청으로 데이터 가져온 후 변경된 데이터인지 확인하는 함수로 수정
const isChangedData = () => true;

const validatePathname = (pathname) => {
  if (hasPropertyValue(ROUTES, pathname)) {
    return;
  }

  throw new Error(`${pathname}은 잘못된 경로입니다.`);
};

const renderByPathname = (pathname) => {
  try {
    validatePathname(pathname);

    // TODO: API요청으로 데이터 가져온 후 인자로 isChangedData에 전달
    if (isChangedData()) {
      render[pathname]();
    }
  } catch (error) {
    // TODO: 잘못된 경로일 경우 스낵바 표시
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const goTo = (pathname) => {
  if (isChangedPathname(pathname)) {
    window.history.pushState(null, null, pathname);
  }

  renderByPathname(pathname);
};

const handleHeaderClick = (event) => {
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
  goTo(pathname);
};

$header.addEventListener('click', handleHeaderClick);

const handleWindowPopstate = ({ target }) => {
  const { pathname } = target.location;

  renderByPathname(pathname);
};

window.addEventListener('popstate', handleWindowPopstate);
