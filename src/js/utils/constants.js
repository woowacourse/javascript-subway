export const API_END_POINT = 'https://www.boorownie.com';
export const TOKEN_KEY = 'token';
export const COOKIE_EXPIRE_TIME = 60;
export const SNACKBAR_SHOW_TIME = 1500;

export const PATH = Object.freeze({
  MAIN: '/',
  STATIONS: '/stations',
  LINES: '/lines',
  SECTIONS: '/sections',
  MAP: '/map',
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
  PUT: 'PUT',
  DELETE: 'DELETE',
});

export const TYPE = Object.freeze({ JSON: 'json', TEXT: 'text' });

export const REG_EXP = {
  NAME: /^[a-z가-힣]+$/i,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  LINE_NAME: /^[a-z가-힣0-9]+$/i,
};

export const STANDARD_NUMBER = Object.freeze({
  PASSWORD_MIN_LENGTH: 8,
  SIGN_UP_FORM_INPUT_COUNT: 4,
  SIGN_IN_FORM_INPUT_COUNT: 2,
  KEY_UP_CHECK_TIME: 100,
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_EMAIL_FORMAT: '이메일 형식이 올바르지 않습니다.',
  INVALID_NAME_TYPE: '이름 형식이 올바르지 않습니다.',
  NEED_OVER_PASSWORD_MIN_LENGTH: `비밀번호는 ${STANDARD_NUMBER.PASSWORD_MIN_LENGTH}자 이상으로 입력하셔야 합니다.`,
  DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM: '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
  DUPLICATED_EMAIL: '중복된 이메일을 입력하셨습니다.',
  SIGN_UP_FAIL: '회원가입에 실패하였습니다.',
  SIGN_IN_FAIL: '이메일과 비밀번호를 확인해주세요.',
  NEED_DIFFERENT_UP_DOWN_STATION: '상행역과 하행역은 동일하게 설정할 수 없습니다.',
  NEED_SELECT_COLOR: '색을 선택해주세요.',
  DUPLICATED_LINE_COLOR: '이미 같은 색의 노선이 존재합니다.',
});

export const SUCCESS_MESSAGE = Object.freeze({
  SIGN_IN: '로그인에 성공했습니다',
  SIGN_UP: '회원가입에 성공했습니다.',
  SIGN_OUT: '로그아웃이 완료되었습니다.',
});

export const SIGN_OUT_CONFIRM_MESSAGE = '로그아웃 하시겠습니까?';
export const REMOVE_CONFIRM_MESSAGE = '정말 삭제하시겠습니까?';

export const ELEMENT = Object.freeze({
  APP: 'app',

  MODAL: 'modal',
  MODAL_CLOSE: 'modal-close',
  MODAL_STATION_OPTIONS_WRAPPER: 'modal__station-options-wrapper',
  MODAL_LINE_OPTIONS_WRAPPER: 'modal__line-options-wrapper',
  MODAL_SECTION_FORM: 'modal__section-form',
  MODAL_LINE_FORM: 'modal__line-form',
  MODAL_LINE_NAME: 'modal__line-name',
  MODAL_STATION_NAME_EDIT_INPUT: 'modal__station-name-edit-input',
  MODAL_STATION_NAME_EDIT_FORM: 'modal__station-name-edit-form',
  MODAL_LINE_DISTANCE: 'modal_line-distance',
  MODAL_LINE_DURATION: 'modal_line-duration',
  MODAL_LINE_SUBMIT_BUTTON: 'modal__line-submit-button',
  ADD_MODAL: 'add-modal',
  EDIT_MODAL: 'edit-modal',

  MAIN_SCREEN: 'main-screen',
  MAIN_MENU_ROUTER: 'main__menu-router',
  MENU_LINK: 'menu-link',

  NAV_BAR: 'nav-bar',
  NAV_BAR_SIGN_IN_BUTTON: 'nav-bar__sign-in-button',
  NAV_BAR_STATION_BUTTON: 'nav-bar__station-button',
  NAV_BAR_LINE_BUTTON: 'nav-bar__line-button',
  NAV_BAR_SECTION_BUTTON: 'nav-bar__section-button',
  NAV_BAR_MAP_BUTTON: 'nav-bar__map-button',

  CREATE_LINE_BUTTON: 'create-line-button',
  LINE_LIST_ITEM_EDIT_BUTTON: 'line-list-item__edit-button',
  LINE_LIST_ITEM_REMOVE_BUTTON: 'line-list-item__remove-button',

  SIGN_UP_BUTTON: 'sign-up-button',
  SIGN_UP_EMAIL_INPUT: 'signup-form__email-input',
  SIGN_UP_USER_NAME_INPUT: 'signup-form__user-name-input',
  SIGN_UP_PASSWORD_INPUT: 'signup-form__password-input',
  SIGN_UP_PASSWORD_CONFIRM_INPUT: 'signup-form__password-confirm-input',
  SIGN_UP_SUBMIT_BUTTON: 'signup-form__submit-button',
  SIGN_UP_EMAIL_CHECK_TEXT_AREA: 'signup-form__email-check-text-area',
  SIGN_UP_USER_NAME_CHECK_TEXT_AREA: 'signup-form__user-name-check-text-area',
  SIGN_UP_PASSWORD_CHECK_TEXT_AREA: 'signup-form__password-check-text-area',
  SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA: 'signup-form__password-confirm-check-text-area',

  STATION_FORM: 'station-form',
  STATION_LIST_ITEM: 'station-list-item',
  STATION_NAME: 'station-name',
  STATION_LIST_WRAPPER: 'station-list-wrapper',
  STATION_LIST_ITEM_EDIT_BUTTON: 'station-list-item__edit-button',
  STATION_LIST_ITEM_REMOVE_BUTTON: 'station-list-item__remove-button',
  SIGN_IN_TOGGLE: 'sign-in-toggle',
  SIGN_IN_FORM: 'sign-in-form',
  SIGN_UP_FORM: 'signup-form',
  SIGN_IN_EMAIL_INPUT: 'signin-form__email-input',
  SIGN_IN_PASSWORD_INPUT: 'signin-form__password-input',
  SIGN_IN_SUBMIT_BUTTON: 'signin-form__submit-button',
  SIGN_IN_EMAIL_CHECK_TEXT_AREA: 'signin-form__email-check-text-area',
  SIGN_IN_PASSWORD_CHECK_TEXT_AREA: 'signin-form__password-check-text-area',

  INPUT_FIELD: 'input-field',
  INPUT_SUBMIT: 'input-submit',

  EMAIL: 'email',
  PASSWORD: 'password',
  USER_NAME: 'user-name',
  PASSWORD_CONFIRM: 'password-confirm',

  LINE_LIST_WRAPPER: 'line-list-wrapper',
  LINE_OPTIONS_WRAPPER: 'line-options-wrapper',
  LINE_COLOR_SELECTOR: 'subway-line-color-selector',
  SUBWAY_LINE_NAME: 'subway-line-name',
  LINE_LIST_ITEM: 'line-list-item',

  CREATE_SECTION_BUTTON: 'create-section-button',
  SUBWAY_LINE_FOR_SECTION: 'subway-line-for-section',
  SECTION_LIST_ITEM: 'section-list-item',
  SECTION_LIST_ITEM_REMOVE_BUTTON: 'section-list-item__remove-button',

  SELECTED_COLOR: 'selected-color',
  COLOR_OPTION: 'color-option',

  UP_STATION: 'up-station',
  DOWN_STATION: 'down-station',

  SUCCESS: 'success',
  FAIL: 'fail',
});
