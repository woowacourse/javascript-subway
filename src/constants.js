export const SELECTOR_ID = Object.freeze({
  APP: 'app',
  NAVIGATOR: 'navigator',
  MAIN_CONTAINER: 'main-container',
  STATION_LIST: 'station-list',
  STATION_FORM: 'station-form',
  STATION_FORM_NAME_INPUT: 'station-form__name-input',
  STATION_FORM_SUBMIT: 'station-form__submit',
  LINE_LIST: 'line-list',
  SECTION_STATION_LIST: 'section-station-list',
  SECTION_MODAL_OPEN: 'section__modal-open',
  SECTION_MODAL_SUBMIT: 'section-modal__submit',
  SECTION_LINE: 'section-line',
  SECTION_LINE_SELECT: 'section-line-select',
  SECTION_MODAL_LINE_SELECT: 'section-modal__line-select',
  SECTION_MODAL_UP_STATION_SELECT: 'section-modal__up-station-select',
  SECTION_MODAL_DOWN_STATION_SELECT: 'section-modal__down-station-select',
  SECTION_MODAL_DISTANCE_INPUT: 'section-modal__distance-input',
  SECTION_MODAL_DURATION_INPUT: 'section-modal__duration-input',
  LINES: 'lines',
  LINE_MODAL_NAME_INPUT: 'line-modal__name-input',
  LINE_MODAL_UP_STATION_INPUT: 'line-modal__up-station-input',
  LINE_MODAL_DOWN_STATION_INPUT: 'line-modal__down-station-input',
  LINE_MODAL_DISTANCE_INPUT: 'line-modal__distance-input',
  LINE_MODAL_DURATION_INPUT: 'line-modal__duration-input',
  LINE_MODAL_COLOR_INDICATOR: 'line-modal__color-indicator',
  LINE_MODAL_REGISTER_SUBMIT: 'line-modal__register-submit',
  LINE_MODAL_UPDATE_SUBMIT: 'line-modal__update-submit',
  LINE_FORM: 'line-form',
  SECTION_FORM: 'section-form',
  LOG_IN_FORM: 'login-form',
  LOG_IN_BUTTON: 'login-button',
  LOG_IN_EMAIL_INPUT: 'login-email-input',
  LOG_IN_PASSWORD_INPUT: 'login-password-input',
  LOG_OUT_BUTTON: 'logout-button',
  SIGN_UP_FORM_WRAPPER: 'signup-form-wrapper',
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
  STATION_LIST_ITEM_UPDATE: 'station-list__item-update',
  STATION_LIST_ITEM_UPDATE_COMPLETE: 'station-list__item-update-complete',
  STATION_LIST_ITEM_DELETE: 'station-list__item-delete',
  LINE_LIST_ITEM: 'line-list__item',
  LINE_LIST_ITEM_UPDATE: 'line-list__item-update',
  LINE_DELETE_BUTTON: 'line-list__delete-button',
  LINE_LIST_MODAL_OPEN: 'line-list__modal-open',
  LINE_LIST_MODAL_CLOSE: 'line-list__modal-close',
  SECTION_ITEM: 'section__item',
  SECTION_ITEM_ADD: 'section__item-add',
  SECTION_MODAL_CLOSE: 'section__modal-close',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  LINE_COLOR_PICKER: 'line-color-picker',
  LINE_REGISTER_FORM: 'line-register-form',
  LINE_UPDATE_FORM: 'line-update-form',
  MODAL_INNER: 'modal-inner',
  MODAL: 'modal',
  COLOR_OPTION: 'color-option',
});

export const SELECTOR_NAME = Object.freeze({
  STATION_NAME: 'station-name',
  LINE_NAME: 'line-name',
  UP_STATION: 'up-station',
  DOWN_STATION: 'down-station',
  LINE_DISTANCE: 'line-distance',
  LINE_DURATION: 'line-duration',
  LINE_COLOR: 'line-color',
});

export const STYLE_CLASS = Object.freeze({
  REMOVED: 'd-none',
  HOVER: 'hover'
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
  USER_EMAIL: 'userEamil',
  USER_PASSWORD: 'userPassword'
});

export const STATE_KEY = Object.freeze({
  IS_LOGGED_IN: 'isLoggedIn',
  LINE_LIST: 'lineList',
  STATION_LIST: 'stationList',
  SECTION_LIST: 'sectionList',
  TARGET_LINE_ID: 'targetLineId',
  TARGET_SECTION_LINE_ID: 'targetSectionLineId',
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
  STATION_GET_FAILED: '역 조회에 실패하였습니다',
  STATION_REGISTRATION_FAILED: '역 등록에 실패하였습니다',
  STATION_UPDATE_FAILED: '역 수정에 실패하였습니다',
  DELETING_STATION_EXCLUDED_IN_LINE: '삭제하려는 역이 노선에 이미 등록되어 있습니다.',
  LINE_GET_FAILED: '노선 조회에 실패하였습니다',
  LINE_UPDATE_FAILED: '노선 수정에 실패하였습니다',
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
  SECTIONS: '🚇 구간 관리',
  LOG_IN: '🚇 로그인',
  SIGN_UP: '🚇 회원가입',
  SEARCH: '🚇 길찾기',
  SUBWAY: '🚇 전체 보기',
});

export const SETTINGS = Object.freeze({
  NOT_INITIATED_NUMBER: -1,
});