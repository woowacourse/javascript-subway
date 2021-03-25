export const HOST = 'https://www.boorownie.com';

export const SESSION_EXPIRE_DAYS = 1;

export const SELECTOR = {
  NAVIGATION: '#navigation',
  NAV_BUTTON: '.nav-btn',
  NAV_LOG_BUTTON: '#login-nav-button',
  CONTENT: '#content',
  MODAL: '.modal',

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
};

export const MESSAGES = {
  SIGNUP_SUCCESS: '회원가입에 성공했습니다.',
  LOGIN_FAIL: '아이디, 패스워드를 확인하세요.',

  ENTRY_DESCRIPTION_LOGGED_IN: '상단 탭을 클릭해주세요. 🦕',
  ENTRY_DESCRIPTION_LOGGED_OUT:
    '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',

  ERROR_FETCH_USER_INFO: '사용자 정보를 가져오는 과정에서 문제가 발생했습니다.',
  ERROR_FETCH_STATION_DATA:
    '지하철 데이터를 가져오는 과정에서 문제가 발생했습니다.',

  STATION_DELETE: {
    CONFIRM: (station) => `${station}역을 삭제하시겠습니까?`,
    SUCCESS: (station) => `${station}역이 삭제되었습니다.`,
    FAIL: '역 삭제에 실패했습니다.',
  },
};

export const BUTTON_NAME = {
  LOGOUT: '🔌 로그아웃',
  LOGIN: '👤 로그인',
};
