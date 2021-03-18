export const STATE_KEY = {
  ROUTE: 'route',
  IS_SIGNED: 'isSigned',
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
  },
  SIGNIN: {
    REQUIRED: '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',
    INVITE: '아직 회원이 아니신가요?',
  },
};
