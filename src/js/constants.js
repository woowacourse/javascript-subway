// export const BASE_URL = 'https://www.boorownie.com';
export const BASE_URL = 'http://3.35.213.149';

export const REQUEST_HEADER_HOST = 'localhost:42069';

export const ACTIONS = {
  REGISTER: '/members',
  USER: '/members/me',
  LOGIN: '/login/token',
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
};

export const CLASS_NAME = {
  SHOW: 'show',
  SIGNUP_LINK: 'signup-link',
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

export const ERROR_MESSAGE = {
  WRONG_EMAIL_OR_PASSWORD: '잘못된 이메일 혹은 비밀번호 입니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
  DUPLICATED_EMAIL: '중복된 이메일로 가입할 수 없습니다!',
  SIGNUP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
  EMPTY_NAME: '이름은 공백이 될 수 없습니다!',
  EMPTY_EMAIL: '이메일은 공백이 될 수 없습니다!',
  EMPTY_PASSWORD: '비밀번호는 공백이 될 수 없습니다!',
  EMPTY_PASSWORD_CONFIRM: '비밀번호 확인은 공백이 될 수 없습니다!',
  DIFFERENT_PASSWORD: '비밀번호가 일치하지 않습니다!',
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
};

export const LOGIN_ERROR = {
  [STATUS.LOGIN.WRONG_INPUT]: ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
};

export const SIGNUP_ERROR = {
  [STATUS.SIGNUP.DUPLICATED_EMAIL]: ERROR_MESSAGE.DUPLICATED_EMAIL,
};
