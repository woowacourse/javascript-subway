import { hasPropertyValue } from '../utils/index.js';
import { PATHNAMES } from '../constants/index.js';
import { isLoggedIn } from '../auth/index.js';

export default function getValidPathname(pathname) {
  try {
    validateAuthentication(pathname);
    validatePathname(pathname);

    return pathname;
  } catch (error) {
    // TODO: 잘못된 경로일 경우 스낵바 표시
    // eslint-disable-next-line no-console
    console.error(error);

    return PATHNAMES.HOME;
  }
}

const allowedPATHNAMES = [PATHNAMES.HOME, PATHNAMES.LOGIN, PATHNAMES.LOGOUT, PATHNAMES.SIGN_UP];

function validateAuthentication(pathname) {
  if (allowedPATHNAMES.includes(pathname)) {
    return;
  }

  if (!isLoggedIn()) {
    throw new Error('로그인 전에는 메뉴를 열람하실 수 없습니다.');
  }
}

function validatePathname(pathname) {
  try {
    if (hasPropertyValue(PATHNAMES, pathname)) {
      return;
    }
  } catch (error) {
    throw new TypeError(error.message);
  }

  throw new Error(`${pathname}은 잘못된 경로입니다.`);
}
