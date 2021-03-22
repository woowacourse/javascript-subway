export const SELECTOR_ID = Object.freeze({
  APP: 'app',
  NAVIGATOR: 'navigator',
  MAIN_CONTAINER: 'main-container',
  STATION_LIST: 'station-list',
  STATION_FORM: 'station-form',
  LINE_LIST: 'line-list',
  SECTION_LIST: 'section-list',
  SUBWAY_LINE: 'subway-line',
  LOG_IN_FORM: 'login-form',
  LOG_IN_BUTTON: 'login-button',
  LOG_IN_EMAIL_INPUT: 'login-email-input',
  LOG_IN_PASSWORD_INPUT: 'login-password-input',
  LOG_OUT_BUTTON: 'logout-button',
  SIGN_UP_FORM: 'signup-form',
  SIGN_UP_BUTTON: 'signup-button',
  SIGN_UP_EMAIL_INPUT: 'signup-email-input',
  SIGN_UP_PASSWORD_INPUT: 'signup-password-input',
  SIGN_UP_PASSWORD_CHECK_INPUT: 'signup-password-check-input',
  SIGN_UP_NAME_INPUT: 'signup-name-input',
  GUIDE_WRAPPER: 'guide-wrapper',
});

export const SELECTOR_CLASS = Object.freeze({
  NAVIGATOR_BUTTON: 'js-navigator__button',
  CREATE_LINE_BUTTON: 'create-line-btn',
});

export const PATH = Object.freeze({
  ROOT: '/',
  LINES: '/lines',
  STATIONS: '/stations',
  SECTIONS: '/sections',
  LOG_IN: '/login',
  SIGN_UP: '/signup',
  SEARCH: '/search',
  SUBWAY: '/subway',
  LOG_OUT: '/logout',
});

export const SESSION_STORAGE_KEY = Object.freeze({
  ACCESS_TOKEN: 'accessToken',
});

export const STATE_KEY = Object.freeze({
  IS_LOGGED_IN: 'isLoggedIn',
  LINE_LIST: 'lineList',
  STATION_LIST: 'stationList',
  SECTION_LIST: 'sectionList',
});

export const VALIDATION = Object.freeze({
  MIN_STATION_NAME_LENGTH: 2,
  MAX_STATION_NAME_LENGTH: 20
})

export const ALERT_MESSAGE = Object.freeze({
  PASSWORD_UNMATCHED: '비밀번호 확인이 일치하지 않습니다',
  LOGIN_FAILED: '로그인에 실패하셨습니다',
  SIGNUP_FAILED: '회원가입에 실패하였습니다',
  STATION_REGISTRATION_FAILED: '역 등록에 실패하였습니다',
  NOT_PROPER_STATION_NAME_LENGTH: `역의 이름은 ${VALIDATION.MIN_STATION_NAME_LENGTH}자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하여야 합니다`,
  DUPLICATED_STATION_NAME_EXIST: '이미 등록된 역의 이름입니다'
});
