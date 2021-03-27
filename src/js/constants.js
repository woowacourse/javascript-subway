export const BASE_URL = 'https://www.boorownie.com';

export const ACTIONS = {
  REGISTER: '/members',
  USER: '/members/me',
  LOGIN: '/login/token',
  DUPLICATED_EMAIL: '/members/check-validation?email=',
  STATIONS: '/stations',
};

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  SIGNUP: '/signup',
  STATIONS: '/stations',
  SECTIONS: '/sections',
  LINES: '/lines',
};

export const SELECTOR = {
  HEADER: 'header',
  MENU: '.menu',
  CONTAINER: '.container',
  MODAL: '.modal',
  MENU_LINK: '.menu__link',
  SNACK_BAR: '.snackbar',
  LOGIN_FORM: 'form[name="login"]',
  SIGNUP_FORM: 'form[name="signup"]',
  ADD_STATION_FORM: 'form[name="add-station"]',
  SIGNUP_FORM_SUBMIT: '#signup-form-submit',
  MESSAGE: '.message',
  NAME_MESSAGE: '.name-message',
  EMAIL_MESSAGE: '.email-message',
  PASSWORD_MESSAGE: '.password-message',
  PASSWORD_CONFIRM_MESSAGE: '.password-confirm-message',
  PASSWORD: '#password',
  PASSWORD_CONFIRM: '#password-confirm',
  STATION_LIST: '#station-list',
};

export const CLASS_NAME = {
  SHOW: 'show',
  SIGNUP_LINK: 'signup-link',
  VALID: 'valid',
};

export const FORM = {
  SIGNUP: {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'password-confirm',
  },

  STATION: {
    ADD_INPUT: 'station-add-input',
  },
};

export const SNACK_BAR = {
  VISIBLE_TIME: 2000,
};

export const STORAGE = {
  USER_ACCESS_TOKEN: 'userAccessToken',
};

export const SNACKBAR_MESSAGE = {
  LOGIN: '로그인 되었습니다 !',
  LOGOUT: '로그아웃 되었습니다 !',
  SIGNUP: '회원가입이 완료되었습니다 !',
};

export const SUCCESS_MESSAGE = {
  NAME: '좋은 이름이네요! 😁',
  EMAIL: '올바른 이메일 입니다.',
  PASSWORD_CONFIRM: '비밀번호가 일치합니다!',
  ADD_STATION: '역이 추가되었습니다! 🚇',
};

export const ERROR_MESSAGE = {
  WRONG_EMAIL_OR_PASSWORD: '잘못된 이메일 혹은 비밀번호 입니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
  DUPLICATED_EMAIL: '이미 가입된 이메일입니다.',
  SIGNUP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
  EMPTY_NAME: '이름은 공백이 될 수 없습니다!',
  EMPTY_EMAIL: '이메일은 공백이 될 수 없습니다!',
  WRONG_EMAIL_FORMAT: '이메일 형식이 올바르지 않습니다.',
  EMPTY_PASSWORD: '비밀번호는 공백이 될 수 없습니다!',
  EMPTY_PASSWORD_CONFIRM: '비밀번호 확인은 공백이 될 수 없습니다!',
  DIFFERENT_PASSWORD: '비밀번호가 일치하지 않습니다!',
  DUPLICATED_STATION: '중복된 역이 존재합니다!',
  EMPTY_STATION_NAME: '지하철 역은 공백이 될 수 없습니다!',
  OVER_RANGE_STATION_NAME:
    '지하철 역은 최소 2글자 이상, 최대 20글자 이하여야 합니다.',
  LOAD_STATION_FAILED:
    '지하철 역 목록을 불러오는데 실패했습니다. 관리자에게 문의해주세요!',
  ADD_STATION_FAILED: '역을 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.',
};

export const PAGE_TITLE = {
  HOME: '🚇 지하철 APP',
  STATIONS: '🚇 역 관리',
  LINES: '🚇 노선 관리',
  SECTIONS: '🚇 구간 관리',
  LOGIN: '🚇 로그인',
  SIGNUP: '📝 회원가입',
};

export const STATUS = {
  LOGIN: {
    WRONG_INPUT: 400,
  },

  SIGNUP: {
    DUPLICATED_EMAIL: 400,
  },

  STATION: {
    DUPLICATED_EMAIL: 400,
  },
};

export const LOGIN_ERROR = {
  [STATUS.LOGIN.WRONG_INPUT]: ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
};

export const SIGNUP_ERROR = {
  [STATUS.SIGNUP.DUPLICATED_EMAIL]: ERROR_MESSAGE.DUPLICATED_EMAIL,
};

export const STATION_ERROR = {
  [STATUS.STATION.DUPLICATED_STATION]: ERROR_MESSAGE.DUPLICATED_STATION,
};

export const REGEXP = {
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
};
