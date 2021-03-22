export const STATE_KEY = {
  ROUTE: 'route',
  SIGNED_USER: 'signedUser',
};

export const ROUTE = {
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  SIGNOUT: '/signout',
  STATIONS: '/stations',
  LINES: '/lines',
  SECTIONS: '/sections',
  MAP: '/map',
  SEARCH: '/search',
};

export const MENU = {
  STATIONS: '🚉 역 관리',
  LINES: '🛤️ 노선 관리',
  LINES_MODAL: '🛤️ 노선 추가',
  SECTIONS: '🔁 구간 관리',
  SECTIONS_MODAL: '🔁 구간 추가',
  MAP: '🗺️ 전체 보기',
  SEARCH: '🔎 길 찾기',
  SIGNUP: '📝 회원가입',
  SIGNIN: '👋 로그인',
  SIGNOUT: '❎ 로그아웃',
};

export const MESSAGE = {
  SIGNUP: {
    INVALID_EMAIL: '유효하지 않은 이메일입니다.',
    INVALID_NAME: '유효하지 않은 이름입니다.',
    INVALID_PASSWORD: '유효하지 않은 패스워드입니다.',
    INVALID_PASSWORD_CONFIRM: '패스워드가 일치하지 않습니다.',
    FAIL: '회원가입 실패',
    OVERLAP_CHECK_REQUIRED: '중복 여부를 확인해 주세요.',
    UNIQUE_EMAIL: '사용 가능한 이메일입니다.',
    OVERLAPPED_EMAIL: '중복된 이메일입니다.',
  },
  SIGNIN: {
    REQUIRED: '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',
    INVITE: '아직 회원이 아니신가요?',
    FAIL: '아이디 혹은 패스워드가 일치하지 않습니다.',
  },
  STATION_MANAGE: {
    INVALID_NAME: '유효한 역이름이 아닙니다.',
    OVERLAPPED_NAME: '역이름이 중복되었습니다.',
  },
  ROOT_GREETING: name => `${name}님, 안녕하세요! 이번에 리뷰를 받게된 도비, 카일입니다. 😀`,
  RETRY: '일시적인 에러가 발생했습니다. 다시 시도해주세요.',
};

export const REG_EXP = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NAME: /^[가-힣|a-z|A-Z|0-9|]{2,20}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$~!@#$%^&*()-+?])[A-Za-z\d$~!@#$%^&*()-+?]{6,20}$/,
};

export const BASE_URL = 'https://www.boorownie.com';

export const SESSION_KEY = {
  ACCESS_TOKEN: 'ATK',
};
