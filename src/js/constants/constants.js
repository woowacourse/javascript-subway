export const HOST = 'https://www.boorownie.com';

export const SESSION_EXPIRE_DAYS = 1;

export const SELECTOR = {
  NAVIGATION: '#navigation',
  NAV_BUTTON: '.nav-btn',
  NAV_LOG_BUTTON: '#login-nav-button',
  CONTENT: '#content',
  MODAL: '.modal',
  MODAL_CLOSE: '.modal-close',

  ENTRY_DESCRIPTION: '#app-description',

  LOGIN_INPUT_FORM: '#login-form',
  LOGIN_ERROR_WARNING: '#login-error-warning',

  SIGNUP_LINK: '#signup',
  SIGNUP_FORM: '#signup-form',
  SIGNUP_EMAIL_INPUT: '#email',

  EMAIL_INPUT_ERROR: '#email-input-error',
  EMAIL_INPUT_CORRECT: '#email-input-correct',

  PASSWORD: '#password',
  PASSWORD_CONFIRM: '#password-confirm',
  PASSWORD_CONFIRM_ERROR: '#password-confirm-error',
  PASSWORD_CONFIRM_CORRECT: '#password-confirm-correct',

  STATION_LIST: '#station-list',
  STATION_NAME_FORM: '#station-name-form',
  STATION_NAME_INPUT: '#station-name',
  STATION_DUPLICATED_WARNING: '#station-duplicated-warning',

  STATION_NAME_EDIT_FORM: '#station-name-edit-form',
  STATION_NAME_EDIT_INPUT: '#station-name-edit',
  STATION_NAME_EDIT_DUPLICATED_WARNING: '#station-edit-duplicated-warning',

  CREATE_LINE_BUTTON: '.create-line-btn',
  SUBWAY_LINE_COLOR_SELECTOR: '.subway-line-color-selector',

  LINE_LIST: '#line-list',

  LINE_CREATION_FORM: '#subway-line-form',
  LINE_NAME_INPUT: '#subway-line-name',
  LINE_UP_DOWN_STATION_INPUT: '.updown-data',
  LINE_UP_STATION_SELECT: '#up-station',
  LINE_DOWN_STATION_SELECT: '#down-station',
  LINE_DUPLICATED_WARNING: '#line-duplicated-warning',

  LINE_COLOR_INPUT: '#subway-line-color',
  COLOR_OPTION: '.color-option',

  SUBWAY_LINE_SELECT: '#subway-line',
  SECTION_STATION_LIST: '#section-station-list',
  SECTION_ADD_BUTTON: '#add-section-btn',
  LINE_FOR_SECTION: '#subway-line-for-section',
  SECTION_FORM: '#subway-section-form',
  SAME_STATION_WARNING: '#same-station-warning',
};

export const MESSAGES = {
  SIGNUP_SUCCESS: '회원가입에 성공했습니다.',
  LOGIN_FAIL: '아이디, 패스워드를 확인하세요.',

  ENTRY_DESCRIPTION_LOGGED_IN: '상단 탭을 클릭해주세요. 🦕',
  ENTRY_DESCRIPTION_LOGGED_OUT: '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',

  ERROR_FETCH_USER_INFO: '사용자 정보를 가져오는 과정에서 문제가 발생했습니다.',
  ERROR_FETCH_STATION_DATA: '지하철 데이터를 가져오는 과정에서 문제가 발생했습니다.',
  ERROR_FETCH_SECTION_DATA: '구간 데이터를 가져오는 과정에서 문제가 발생했습니다',

  STATION_ADD: {
    FAIL: '해당 역을 등록할 수 없습니다.',
  },

  STATION_DELETE: {
    CONFIRM: (station) => `${station}역을 삭제하시겠습니까?`,
    SUCCESS: (station) => `${station}역이 삭제되었습니다.`,
    FAIL: '역 삭제에 실패했습니다.',
  },

  STATION_NAME_EDIT: {
    SUCCESS: '역 이름이 변경되였습니다.',
    FAIL: '역 이름 변경에 실패했습니다.',
    DUPLICATED: '동일한 역 이름이 존재합니다.',
  },

  LINE_CREATE: {
    SUCCESS: '노선이 추가되었습니다.',
    FAIL: '해당 노선을 등록할 수 없습니다.',
  },

  LINE_DELETE: {
    CONFIRM: (line) => `${line}을 삭제하시겠습니까?`,
    SUCCESS: (line) => `${line}이 삭제되었습니다.`,
    FAIL: '역 삭제에 실패했습니다.',
  },

  LINE_EDIT: {
    SUCCESS: '노선 정보가 변경되였습니다.',
    FAIL: '노선 정보 변경에 실패했습니다.',
    DUPLICATED: '동일한 노선 이름이 존재합니다.',
  },

  SECTION_DELETE: {
    CONFIRM: (station) => `${station}역을 삭제하시겠습니까?`,
    SUCCESS: (station) => `${station}역이 삭제되었습니다.`,
    FAIL: '구간 삭제에 실패했습니다.',
  },

  SECTION_ADD: {
    SUCCESS: '구간을 생성하였습니다.',
    FAIL: '구간 생성에 실패했습니다.',
  },
};

export const BUTTON_NAME = {
  LOGOUT: '🔌 로그아웃',
  LOGIN: '👤 로그인',
};
