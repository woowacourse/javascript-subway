export const BASE_URL = 'https://www.boorownie.com';

export const ACTIONS = {
  REGISTER: '/members',
  USER: '/members/me',
  LOGIN: '/login/token',
  DUPLICATED_EMAIL: '/members/check-validation?email=',
  STATIONS: '/stations',
  LINES: '/lines',
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
  STATION_ITEM_NAME: '.station-list-item-name',
  LINE_MODAL_TITLE: '#line-modal-title',
  LINE_FORM: 'form[name="modify-line"]',
  LINE_LIST: '#line-list',
  LINE_ITEM: '.line-item',
  LINE_ITEM_NAME: '.line-list-item-name',
  SECTION_SELECT_FORM: 'form[name="select-section"]',
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
  REMOVE_STATION: '역이 제거되었습니다!',
  MODIFY_STATION: '역명이 수정되었습니다 !',
  ADD_LINE: '노선이 추가되었습니다! 🚇',
  REMOVE_LINE: '노선이 제거되었습니다!',
  MODIFY_LINE: '노선이 수정되었습니다!',
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
  IN_LINE_STATION: '노선에 포함된 역은 제거할 수 없습니다!',
  OVER_RANGE_STATION_NAME:
    '지하철 역은 최소 2글자 이상, 최대 20글자 이하여야 합니다.',
  LOAD_STATION_FAILED:
    '지하철 역 목록을 불러오는데 실패했습니다. 관리자에게 문의해주세요!',
  ADD_STATION_FAILED: '역을 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.',
  REMOVE_STATION_FAILED:
    '역을 제거하는데 실패했습니다. 잠시후 다시 시도해주세요.',
  LOAD_LINE_FAILED:
    '노선 목록을 불러오는데 실패했습니다. 관리자에게 문의해주세요!',
  OVER_RANGE_LINE_NAME:
    '노선 명은 최소 2글자 이상, 최대 10글자 이하여야 합니다.',
  EMPTY_VALUE: '입력은 공백이 될 수 없습니다!',
  SAME_END_STATION: '상행역과 하행역은 동일할 수 없습니다!',
  NEGATIVE_NUMBER: '입력값은 음수가 될 수 없습니다.',
  REMOVE_LINE_FAILED:
    '노선을 삭제하는데 실패했습니다. 잠시후 다시 시도해주세요.',
};

export const CONFIRM_MESSAGE = {
  REMOVE: '정말로 삭제하시겠습니까 ?',
};

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
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
    DUPLICATED_STATION: 400,
    IN_LINE_STATION: 400,
  },
};

export const LOGIN_ERROR = {
  [STATUS.LOGIN.WRONG_INPUT]: ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
};

export const SIGNUP_ERROR = {
  [STATUS.SIGNUP.DUPLICATED_EMAIL]: ERROR_MESSAGE.DUPLICATED_EMAIL,
};

export const STATION_ERROR = {
  ADD: {
    [STATUS.STATION.DUPLICATED_STATION]: ERROR_MESSAGE.DUPLICATED_STATION,
  },
  DELETE: {
    [STATUS.STATION.IN_LINE_STATION]: ERROR_MESSAGE.IN_LINE_STATION,
  },
};

export const STATION_DELETE_ERROR = {};

export const REGEXP = {
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
};
