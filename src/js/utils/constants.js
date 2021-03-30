export const API_END_POINT = 'https://www.boorownie.com';
export const TOKEN_KEY = 'token';
export const COOKIE_EXPIRE_TIME = 60;
export const SNACKBAR_SHOW_TIME = 1500;

export const ELEMENT = Object.freeze({
  APP: 'app',
  MAIN_SCREEN: 'main-screen',
  NAV_BAR_SIGN_IN_BUTTON: 'nav-bar__sign-in-button',
  SIGN_UP_BUTTON: 'sign-up-button',
  NAV_BAR: 'nav-bar',
  MAIN_MENU_ROUTER: 'main__menu-router',
  SIGN_IN_FORM: 'sign-in-form',
  SIGN_UP_FORM: 'signup-form',
  SIGN_IN_EMAIL_INPUT: 'signin-form__email-input',
  SIGN_IN_PASSWORD_INPUT: 'signin-form__password-input',
  SIGN_IN_SUBMIT_BUTTON: 'signin-form__submit-button',
  SIGN_IN_EMAIL_CHECK_TEXT_AREA: 'signin-form__email-check-text-area',
  SIGN_IN_PASSWORD_CHECK_TEXT_AREA: 'signin-form__password-check-text-area',
  SIGN_UP_EMAIL_INPUT: 'signup-form__email-input',
  SIGN_UP_USER_NAME_INPUT: 'signup-form__user-name-input',
  SIGN_UP_PASSWORD_INPUT: 'signup-form__password-input',
  SIGN_UP_PASSWORD_CONFIRM_INPUT: 'signup-form__password-confirm-input',
  SIGN_UP_SUBMIT_BUTTON: 'signup-form__submit-button',
  SIGN_UP_EMAIL_CHECK_TEXT_AREA: 'signup-form__email-check-text-area',
  SIGN_UP_USER_NAME_CHECK_TEXT_AREA: 'signup-form__user-name-check-text-area',
  SIGN_UP_PASSWORD_CHECK_TEXT_AREA: 'signup-form__password-check-text-area',
  SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA: 'signup-form__password-confirm-check-text-area',
  INPUT_SUBMIT: 'input-submit',
  EMAIL: 'email',
  PASSWORD: 'password',
  USER_NAME: 'user-name',
  PASSWORD_CONFIRM: 'password-confirm',
});

export const PATH = Object.freeze({
  MAIN: '/',
  STATIONS: '/stations',
  LINES: '/lines',
  SECTIONS: '/sections',
  MAP: '/map',
  SEARCH: '/search',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  SIGNOUT: '/signout',
});

export const TITLES = Object.freeze({
  '/': '🚇 지하철 노선도',
  '/stations': '🚉 역 관리',
  '/lines': '🛤 노선 관리',
  '/sections': '🔁 구간 관리',
  '/map': '🗺️ 전체 보기',
  '/search': '🔎 길 찾기',
  '/signin': '🙆🏻 로그인',
  '/signup': '📝 회원가입',
});

export const MENU_TITLE = Object.freeze({
  SIGN_OUT: '🙅🏻 로그아웃',
  SIGN_IN: '🙆🏻 로그인',
});

export const METHOD = Object.freeze({
  POST: 'POST',
  GET: 'GET',
});

export const TYPE = Object.freeze({ JSON: 'json', TEXT: 'text' });

export const REG_EXP = {
  USER_NAME: /^[a-z가-힣]+$/i,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const STANDARD_NUMBER = Object.freeze({
  PASSWORD_MIN_LENGTH: 8,
  SIGN_UP_FORM_INPUT_COUNT: 4,
  SIGN_IN_FORM_INPUT_COUNT: 2,
  KEY_UP_CHECK_TIME: 100,
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_EMAIL_FORMAT: '이메일 형식이 올바르지 않습니다.',
  INVALID_USER_NAME_TYPE: '이름이 올바르지 않습니다.',
  NEED_OVER_PASSWORD_MIN_LENGTH: `비밀번호는 ${STANDARD_NUMBER.PASSWORD_MIN_LENGTH}자 이상으로 입력하셔야 합니다.`,
  DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM: '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
  DUPLICATED_EMAIL: '중복된 이메일을 입력하셨습니다.',
  SIGN_UP_FAIL: '회원가입에 실패하였습니다.',
  SIGN_IN_FAIL: '이메일과 비밀번호를 확인해주세요.',
});

export const SUCCESS_MESSAGE = Object.freeze({
  SIGN_IN: '로그인에 성공했습니다',
  SIGN_UP: '회원가입에 성공했습니다.',
  SIGN_OUT: '로그아웃이 완료되었습니다.',
});

export const SIGN_OUT_CONFIRM_MESSAGE = '로그아웃 하시겠습니까?';
