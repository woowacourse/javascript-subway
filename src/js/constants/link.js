const HOME_LINK = {
  ROUTE: '/',
};

const AUTHENTICATED_LINK = {
  STATION: {
    ROUTE: '/station',
    NAME: '🚉 역 관리',
  },
  LINE: {
    ROUTE: '/line',
    NAME: '🛤️ 노선 관리',
  },
  SECTION: {
    ROUTE: '/section',
    NAME: '🔁 구간 관리',
  },
  MAP: {
    ROUTE: '/map',
    NAME: '🗺️ 전체 보기',
  },
  LOGOUT: {
    ROUTE: '/logout',
    NAME: '👤 로그아웃',
  },
};

const UNAUTHENTICATED_LINK = {
  LOGIN: {
    ROUTE: '/login',
    NAME: '👤 로그인',
  },
  SIGNUP: {
    ROUTE: '/signup',
    NAME: '👤 회원가입',
  },
};

export { HOME_LINK, AUTHENTICATED_LINK, UNAUTHENTICATED_LINK };
