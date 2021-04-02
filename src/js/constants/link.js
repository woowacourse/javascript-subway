const HOME_LINK = {
  PATH: '/',
};

const AUTHENTICATED_LINK = {
  STATION: {
    PATH: '/station',
    NAME: '🚉 역 관리',
  },
  LINE: {
    PATH: '/line',
    NAME: '🛤️ 노선 관리',
  },
  SECTION: {
    PATH: '/section',
    NAME: '🔁 구간 관리',
  },
  MAP: {
    PATH: '/map',
    NAME: '🗺️ 전체 보기',
  },
  LOGOUT: {
    PATH: '/logout',
    NAME: '👤 로그아웃',
  },
};

const UNAUTHENTICATED_LINK = {
  LOGIN: {
    PATH: '/login',
    NAME: '👤 로그인',
  },
  SIGNUP: {
    PATH: '/signup',
    NAME: '👤 회원가입',
  },
};

export { HOME_LINK, AUTHENTICATED_LINK, UNAUTHENTICATED_LINK };
