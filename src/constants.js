export const SELECTOR_ID = Object.freeze({
  APP: 'app',
  NAVIGATOR: 'navigator',
  MAIN_CONTAINER: 'main-container',
  STATION_LIST: 'station-list',
  STATION_FORM: 'station-form',
  STATION_NAME_INPUT: 'station-name-input',
  STATION_LIST_ITEM_REGISTER: 'station-list-item-register',
  LINE_LIST: 'line-list',
  LINE_MODAL_UP_STATION_SELECT: 'line-modal__up-station-select',
  LINE_MODAL_DOWN_STATION_SELECT: 'line-modal__down-station-select',
  LINE_MODAL_DISTANCE_INPUT: 'line-modal__distance-input',
  LINE_MODAL_DURATION_INPUT: 'line-modal__duration-input',
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
  SUBWAY_LINE_COLOR_INDICATOR: 'subway-line-color-indicator',
  SUBWAY_LINE_COLOR_INDICATOR_CONTAINER: 'subway-line-color-indicator-container',
  SUBWAY_LINE_FORM: 'subway-line-form',
  SUBWAY_LINE_NAME: 'subway-line-name',
  SUBWAY_SECTION_FORM: 'subway-section-form',
  SUBWAY_MAP_CONTAINER: 'subway-map-container',
  SUBWAY_MAP_WRAPPER: 'subway-map-wrapper',
  LOG_IN_FORM: 'login-form',
  LOG_IN_BUTTON: 'login-button',
  LOG_IN_EMAIL_INPUT: 'login-email-input',
  LOG_IN_PASSWORD_INPUT: 'login-password-input',
  LOG_OUT_BUTTON: 'logout-button',
  SIGN_UP_FORM: 'signup-form',
  SIGN_UP_FORM_WRAPPER: 'signup-form-wrapper',
  SIGN_UP_BUTTON: 'signup-button',
  SIGN_UP_EMAIL_INPUT: 'signup-email-input',
  SIGN_UP_PASSWORD_INPUT: 'signup-password-input',
  SIGN_UP_PASSWORD_CHECK_INPUT: 'signup-password-check-input',
  SIGN_UP_NAME_INPUT: 'signup-name-input',
  GUIDE_WRAPPER: 'guide-wrapper',
  BACKDROP: 'backdrop',
  COLOR_PICKER_CONTAINER: 'color-picker-container',
});

export const SELECTOR_CLASS = Object.freeze({
  NAVIGATOR_BUTTON: 'navigator__button',
  STATION_LIST_ITEM: 'station-list__item',
  STATION_LIST_ITEM_NAME: 'station-list__item-name',
  STATION_LIST_ITEM_INPUT: 'station-list__item-input',
  STATION_LIST_ITEM_UPDATE: 'station-list__item-update',
  STATION_LIST_ITEM_UPDATE_COMPLETE: 'station-list__item-update-complete',
  STATION_LIST_ITEM_DELETE: 'station-list__item-delete',
  STATION_LIST_INCLUDED_LINE: 'station-list__included-line',
  STATION_LIST_INCLUDED_LINES: 'station-list__included-lines',
  LINE_LIST_ITEM: 'line-list__item',
  LINE_LIST_ITEM_UPDATE: 'line-list__item-update',
  LINE_DELETE_BUTTON: 'line-list__delete-button',
  LINE_LIST_MODAL_OPEN: 'line-list__modal-open',
  LINE_LIST_MODAL_CLOSE: 'line-list__modal-close',
  SECTION_ITEM: 'section__item',
  SECTION_ITEM_ADD: 'section__item-add',
  SECTION_MODAL_CLOSE: 'section__modal-close',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  SECTION_CONTAINER: 'section-container',
  SECTION_DISTANCE: 'section-distance',
  SECTION_DURATION: 'section-duration',
  SECTION_HORIZONTAL_LINE: 'section-horizontal-line',
  UP_STATION_POINT: 'up-station-point',
  DOWN_STATION_POINT: 'down-station-point',
  STATION_CONNECTION: 'station-connection',
  SUBWAY_LINE_COLOR_PICKER: 'subway-line-color-picker',
  SUBWAY_LINE_REGISTER_FORM: 'subway-line-register-form',
  SUBWAY_LINE_UPDATE_FORM: 'subway-line-update-form',
  SUBWAY_MAP_LINE: 'subway-map-line',
  MODAL_INNER: 'modal-inner',
  MODAL_CLOSE: 'modal-close',
  MODAL: 'modal',
  COLOR_OPTION: 'color-option',
  INPUT_SUBMIT: 'input-submit',
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
  USER_NAME: 'userName',
  LINE_LIST: 'lineList',
  STATION_LIST: 'stationList',
  TARGET_LINE_ID: 'targetLineId',
  TARGET_SECTION_LINE_ID: 'targetSectionLineId',
  TARGET_MENU: 'targetMenu',
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
  SECTION_REGISTRATION_FAILED: '구간 등록에 실패하였습니다',
  LINE_GET_FAILED: '노선 조회에 실패하였습니다',
  LINE_UPDATE_FAILED: '노선 수정에 실패하였습니다',
  NOT_PROPER_STATION_NAME_LENGTH: `역의 이름은 ${VALIDATION.MIN_STATION_NAME_LENGTH}자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하여야 합니다`,
  NOT_PROPER_LINE_NAME_LENGTH: `노선의 이름은 ${VALIDATION.MIN_LINE_NAME_LENGTH}자 이상 ${VALIDATION.MAX_LINE_NAME_LENGTH}자 이하여야 합니다`,
  DUPLICATED_STATION_NAME_EXIST: '이미 등록된 역의 이름입니다',
  DUPLICATED_LINE_NAME_EXIST: '이미 등록된 노선의 이름입니다',
  STATION_INCLUDED_IN_LINE: '노선에 포함되어있는 역은 삭제할 수 없습니다',
  AT_LEAST_TWO_STATIONS_IN_LINE: '노선에 포함된 역은 최소 2개 이상이어야 합니다',
  NO_UP_DOWN_STATION_SELECTED: '상행역과 하행역을 선택해주세요',
  NO_LINE_COLOR_SELECTED: '노선 색깔을 선택해주세요',
  UP_STATION_EQUALS_DOWN_STATION: '상행역과 하행역은 동일할 수 없습니다',
  SECTION_MUST_INCLUDED_IN_LINE: '대상 노선과 이어진 구간만을 추가할 수 있습니다',
  USER_UNDEFINED: '유저 정보를 불러올 수 없습니다',
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
  NOT_INITIATED_MENU: '/ROOT',
  NOT_INITIATED_NAME: '',
  SELECTED_MENU_COLOR: 'bg-cyan-200',
});