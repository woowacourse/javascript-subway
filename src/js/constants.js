const ID_SELECTOR = {
  MAIN: 'main',
  MODAL: 'modal',

  NAV_STATION: 'nav__station',
  NAV_LINE: 'nav__line',
  NAV_SECTION: 'nav__section',
  NAV_FULL_MAP: 'nav__full-map',
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
  LINE_LIST: 'line-list',
  LINE_MODAL_FORM: 'line-modal-form',
  LINE_MODAL_FORM_NAME: 'line-modal-form__name',
  LINE_MODAL_FORM_UP_STATION: 'line-modal-form__up-station',
  LINE_MODAL_FORM_DOWN_STATION: 'line-modal-form__down-station',
  LINE_MODAL_FORM_DISTANCE: 'line-modal-form__distance',
  LINE_MODAL_FORM_DURATION: 'line-modal-form__duration',
  LINE_MODAL_FORM_COLOR: 'line-modal-form__color',
  LINE_MODAL_FORM_SUBMIT: 'line-modal-form__submit',

  SECTION_CREATION_BUTTON: 'section-creation-button',
  SECTION_FORM: 'section-form',
  SECTION_FORM_SELECT: 'section-form__select',
  SECTION_LIST: 'section-list',
  SECTION_MODAL_FORM: 'section-modal-form',
  SECTION_MODAL_FORM_LINE_SELECT: 'section-modal-form__line-select',
  SECTION_MODAL_FORM_UP_STATION_SELECT: 'section-modal-form__up-station-select',
  SECTION_MODAL_FORM_DOWN_STATION_SELECT:
    'section-modal-form__down-station-select',
  SECTION_MODAL_FORM_DISTANCE: 'section-modal-form__distance',
  SECTION_MODAL_FORM_DURATION: 'section-modal-form__duration',
  SECTION_MODAL_FORM_SUBMIT: 'section-modal-form__submit',

  FULL_MAP_LINE_LIST: 'full-map-line-list',

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

  LINE_LIST_ITEM: 'js-line-list__item',
  LINE_LIST_ITEM_REVISION: 'js-line-list__item-revision',
  LINE_LIST_ITEM_REMOVAL: 'js-line-list__item-removal',
  LINE_COLOR_SELECTOR: 'js-line-color-selector',
  LINE_COLOR_SELECTOR_OPTION: 'js-line-color-selector__option',

  SECTION_LIST_ITEM_REMOVAL: 'js-section-list__item-removal',

  FULL_MAP_LINE: 'js-full-map-line',
  FULL_MAP_LINE_STATION: 'js-full-map-line__station',

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
  STATION_CREATION_SUCCESS: '새로운 역을 추가했습니다.',
  DUPLICATED_STATION_FAIL: '중복된 역이 있습니다.',
  STATION_NAME_REVISION_SUCCESS: '역 이름을 수정했습니다.',
  STATION_NAME_REVISION_FAIL: '같은 역 이름으로 수정할 수 없습니다.',
  STATION_REMOVAL_SUCCESS: '해당 역을 삭제했습니다.',
  STATION_REMOVAL_FAIL: '노선에 등록된 역은 삭제할 수 없습니다.',

  // LINE
  LINE_CREATION_SUCCESS: '새로운 노선을 추가했습니다.',
  DUPLICATED_LINE_FAIL: '중복된 노선이 있습니다.',
  STATIONS_SETTING_OF_LINE_FAIL:
    '상행역과 하행역이 같은 노선은 생성할 수 없습니다.',
  LINE_REVISION_SUCCESS: '노선을 수정했습니다.',
  LINE_REMOVAL_SUCCESS: '해당 노선을 삭제했습니다.',

  // SECTION
  SECTION_CREATION_SUCCESS: '구간 생성에 성공했습니다.',
  STATIONS_SETTING_OF_SECTION_CREATION_FAIL:
    '상행역과 하행역이 같은 구간은 생성할 수 없습니다.',
  DISTANCE_CONDITION_OF_SECTION_CREATION_FAIL:
    '새로 생성하는 구간의 거리가 기존 구간의 거리보다 같거나 멉니다.',
  SECTION_REMOVAL_SUCCESS: '해당 구간을 삭제했습니다.',
  SECTION_REMOVAL_FAIL: '구간은 최소 두 개의 역을 가져야합니다.',
  NOT_SELECTED_LINE: '노선을 선택해주세요.',
};

const CONFIRM_MESSAGE = {
  STATION_REMOVAL: '해당 역을 삭제하시겠습니까?',
  LINE_REMOVAL: '해당 노선을 삭제하시겠습니까?',
  SECTION_REMOVAL: '해당 구간을 삭제하시겠습니까?',
};

const KEYWORD = {
  LOGOUT: 'logout',
  CREATION: 'creation',
  REVISION: 'revision',
  NONE: 'none',
};

const REQUEST_URL = 'https://www.boorownie.com';

const URL = {
  HOME: '/',
  STATION: '/station',
  LINE: '/line',
  SECTION: '/section',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MY_INFO: '/myInfo',
  FULL_MAP: '/fullMap',
};

const THRESHOLD = {
  STATION_NAME_MIN_LENGTH: 2,
  STATION_NAME_MAX_LENGTH: 20,

  LINE_NAME_MIN_LENGTH: 2,
  LINE_NAME_MAX_LENGTH: 20,
};

const HTTP_RESPONSE_STATUS = {
  FOUR_ZERO_ZERO: 400,
};

export {
  ID_SELECTOR,
  CLASS_SELECTOR,
  ALERT_MESSAGE,
  CONFIRM_MESSAGE,
  KEYWORD,
  REQUEST_URL,
  URL,
  THRESHOLD,
  HTTP_RESPONSE_STATUS,
};
