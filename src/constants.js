export const SELECTOR_ID = Object.freeze({
  APP: 'app',
  NAVIGATOR: 'navigator',
  MAIN_CONTAINER: 'main-container',
  STATION_LIST: 'station-list',
  STATION_FORM: 'station-form',
  LINE_LIST: 'line-list',
  SECTION_LIST: 'section-list',
  SUBWAY_LINE: 'subway-line',
  SUBWAY_LINE_COLOR_INDICATOR: 'subway-line-color-indicator',
  SUBWAY_LINE_SUBMIT: 'subway-line-submit',
  SUBWAY_LINE_FORM: 'subway-line-form',
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
  BACKDROP: 'backdrop',
});

// TODO : BEM 일괄 적용
export const SELECTOR_CLASS = Object.freeze({
  NAVIGATOR_BUTTON: 'js-navigator__button',
  STATION_LIST_ITEM: 'station-list__item',
  STATION_LIST_ITEM_NAME: 'station-list__item-name',
  STATION_LIST_ITEM_INPUT: 'station-list__item-input',
  STATION_LIST_ITEM_EDIT: 'station-list__item-edit',
  STATION_LIST_ITEM_EDIT_COMPLETE: 'station-list__item-edit-complete',
  STATION_LIST_ITEM_DELETE: 'station-list__item-delete',
  LINE_LIST_ITEM: 'line-list__item',
  LINE_DELETE_BUTTON: 'line-delete-button',
  SECTION_LIST_ITEM: 'section-list__item',
  SUBWAY_LINE_COLOR_PICKER: 'subway-line-color-picker',
  MODAL_OPEN_BUTTON: 'modal-open-button',
  MODAL_INNER: 'modal-inner',
  MODAL_CLOSE: 'modal-close',
  MODAL: 'modal',
  COLOR_OPTION: 'color-option',
});

export const SELECTOR_NAME = Object.freeze({
  SUBWAY_LINE_NAME: 'subway-line-name',
  SUBWAY_UP_STATION: 'subway-up-station',
  SUBWAY_DOWN_STATION: 'subway-down-station',
  LINE_DISTANCE: 'line-distance',
  LINE_DURATION: 'line-duration',
  SUBWAY_LINE_COLOR: 'subway-line-color',
});

export const STYLE_CLASS = Object.freeze({
  REMOVED: 'd-none',
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
  MAX_STATION_NAME_LENGTH: 20,
  MIN_LINE_NAME_LENGTH: 2,
  MAX_LINE_NAME_LENGTH: 10,
});

export const ALERT_MESSAGE = Object.freeze({
  PASSWORD_UNMATCHED: '비밀번호 확인이 일치하지 않습니다',
  LOGIN_FAILED: '로그인에 실패하셨습니다',
  SIGNUP_FAILED: '회원가입에 실패하였습니다',
  STATION_REGISTRATION_FAILED: '역 등록에 실패하였습니다',
  NOT_PROPER_STATION_NAME_LENGTH: `역의 이름은 ${VALIDATION.MIN_STATION_NAME_LENGTH}자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하여야 합니다`,
  NOT_PROPER_LINE_NAME_LENGTH: `노선의 이름은 ${VALIDATION.MIN_LINE_NAME_LENGTH}자 이상 ${VALIDATION.MAX_LINE_NAME_LENGTH}자 이하여야 합니다`,
  DUPLICATED_STATION_NAME_EXIST: '이미 등록된 역의 이름입니다',
  DUPLICATED_LINE_NAME_EXIST: '이미 등록된 노선의 이름입니다',
});

export const CONFIRM_MESSAGE = Object.freeze({
  DELETE: '정말 삭제하시겠습니까?',
});

export const FILE_PATH = Object.freeze({
  STATIONS_CSS: '/stations.css',
  LINES_CSS: '/lines.css',
  SECTIONS_CSS: '/sections.css',
});

export const PAGE_TITLE = Object.freeze({
  STATIONS: '🚇 역 관리',
  LINES: '🚇 노선 관리',
  SECTIONS: '🚇 구관 관리',
  LOG_IN: '🚇 로그인',
  SIGN_UP: '🚇 회원가입',
  SEARCH: '🚇 길찾기',
  SUBWAY: '🚇 전체 보기',
});
