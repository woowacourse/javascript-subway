// export const BASE_URL = 'https://www.boorownie.com';
export const BASE_URL = 'http://3.35.213.149';

export const REQUEST_HEADER_HOST = 'localhost:42069';

export const ACTIONS = {
  REGISTER: '/members',
  USER: '/members/me',
  LOGIN: '/login/token',
};

export const PATH = {
  HOME: '/',
  LOGOUT: '/logout',
  SIGNUP: '/signup',
};

export const SELECTOR = {
  HEADER: 'header',
  MENU: '.menu',
  MENU_LINK: '.menu__link',
  SNACK_BAR: '.snackbar',
  LOGIN_FORM: 'form[name="login"]',
};

export const CLASS_NAME = {
  SHOW: 'show',
  SIGNUP_LINK: 'signup-link',
};

export const SNACK_BAR = {
  VISIBLE_TIME: 2000,
};

export const STORAGE = {
  USER_ACCESS_TOKEN: 'userAccessToken',
};

export const SNACKBAR_MESSAGE = {
  LOGIN: '로그인 되었습니다 !',
  LOGOUT: '로그아웃 되었습니다 !',
  SIGNUP: '회원가입이 완료되었습니다 !',
};

export const ERROR_MESSAGE = {
  WRONG_EMAIL_OR_PASSWORD: '잘못된 이메일 혹은 비밀번호 입니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
};

export const PAGE_TITLE = {
  HOME: '🚇 지하철 APP',
  LINES: '🚇 노선 관리',
  LOGIN: '🚇 로그인',
};

export const STATUS = {
  LOGIN: {
    WRONG_INPUT: 400,
  },
};

export const LOGIN_ERROR = {
  [STATUS.LOGIN.WRONG_INPUT]: ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
};
