const ID_SELECTOR = {
  MAIN: 'main',
  MODAL: 'modal',

  NAV_STATION: 'nav__station',
  NAV_LINE: 'nav__line',
  NAV_SECTION: 'nav__section',
  NAV_FULL_MAP: 'nav__full-map',
  NAV_SEARCH: 'nav__search',
  NAV_LOGIN: 'nav__login',
  NAV_LOGOUT: 'nav__logout',
  NAV_MY_INFO: 'nav__my-info',

  STATION_FORM: 'station-form',
  STATION_FORM_NAME: 'station-form__name',
  STATION_FORM_SUBMIT: 'station-form__submit',
  STATION_LIST: 'station-list',
  STATION_MODAL_FORM: 'station-modal-form',
  STATION_MODAL_FORM_INPUT: 'station-modal-form__input',
  STATION_MODAL_FORM_SUBMIT: 'station-modal-form__submit',

  LINE_CREATION_BUTTON: 'line-creation-button',
  LINE_MODAL_FORM: 'line-modal-form',
  LINE_MODAL_FORM_NAME: 'line-modal-form__name',
  LINE_MODAL_FORM_UP_STATION: 'line-modal-form__up-station',
  LINE_MODAL_FORM_DOWN_STATION: 'line-modal-form__down-station',
  LINE_MODAL_FORM_DISTANCE: 'line-modal-form__distance',
  LINE_MODAL_FORM_DURATION: 'line-modal-form__duration',
  LINE_MODAL_FORM_COLOR: 'line-modal-form__color',
  LINE_MODAL_FORM_SUBMIT: 'line-modal-form__submit',

  MY_INFO_FORM: 'my-info-form',
  MY_INFO_FORM_EMAIL: 'my-info-form__email',
  MY_INFO_FORM_NAME: 'my-info-form__name',
  MY_INFO_FORM_PASSWORD: 'my-info-form__password',
  MY_INFO_FORM_PASSWORD_CONFIRM: 'my-info-form__password-confirm',
  MY_INFO_FORM_SUBMIT: 'my-info-form__submit',

  SIGNUP_FORM: 'signup-form',
  SIGNUP_FORM_EMAIL: 'signup-form__email',
  SIGNUP_FORM_NAME: 'signup-form__name',
  SIGNUP_FORM_PASSWORD: 'signup-form__password',
  SIGNUP_FORM_PASSWORD_CONFIRM: 'signup-form__password-confirm',
  SIGNUP_FORM_SUBMIT: 'signup-form__submit',

  LOGIN_FORM: 'login-form',
  LOGIN_FORM_EMAIL: 'login-form__email',
  LOGIN_FORM_PASSWORD: 'login-form__password',
  LOGIN_FORM_SUBMIT: 'login-form__submit',
};

const CLASS_SELECTOR = {
  ANCHOR: 'js-anchor',
  STATION_LIST_ITEM: 'js-station-list__item',
  STATION_LIST_ITEM_REVISION: 'js-station-list__item-revision',
  STATION_LIST_ITEM_REMOVAL: 'js-station-list__item-removal',

  MODAL_CLOSE: 'js-modal-close',
};

const ALERT_MESSAGE = {
  // SIGNUP
  SIGNUP_SUCCESS: '회원 가입에 성공했습니다.',
  DUPLICATED_EMAIL_FAIL: '중복된 이메일이 있습니다.',

  // LOGIN
  LOGIN_SUCCESS: '로그인에 성공했습니다.',
  LOGIN_FAIL: '가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.',

  // STATION
  DUPLICATED_STATION_FAIL: '중복된 역이 있습니다.',
  STATION_NAME_REVISION_SUCCESS: '역 이름을 수정했습니다.',
  STATION_REMOVAL_SUCCESS: '해당 역을 삭제했습니다.',

  // LINE
  DUPLICATED_LINE_FAIL: '중복된 노선이 있습니다.',
};

const CONFIRM_MESSAGE = {
  STATION_REMOVAL: '해당 역을 삭제하시겠습니까?',
};

const STATE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  STATION: 'station',
};

const KEYWORD = {
  LOGOUT: 'logout',
};

const REQUEST_URL = 'https://www.boorownie.com';

const URL = {
  HOME: '/',
  STATION: '/station',
  LINE: '/line',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MY_INFO: '/myInfo',
};

const THRESHOLD = {
  STATION_MIN_LENGTH: 2,
  STATION_MAX_LENGTH: 20,
};

export {
  ID_SELECTOR,
  CLASS_SELECTOR,
  ALERT_MESSAGE,
  CONFIRM_MESSAGE,
  STATE_KEY,
  KEYWORD,
  REQUEST_URL,
  URL,
  THRESHOLD,
};
