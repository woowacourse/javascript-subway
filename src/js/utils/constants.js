import { deepFreeze } from './deepFreeze.js';

export const routes = deepFreeze({
  '/': { url: '/', title: '🚇 지하철 노선도' },
  '/stations': { url: '/pages/stations.html', title: '🚉 역 관리' },
  '/lines': { url: '/pages/lines.html', title: '🛤 노선 관리' },
  '/sections': { url: '/pages/sections.html', title: '🔁 구간 관리' },
  '/map': { url: '/pages/map.html', title: '🗺️ 전체 보기' },
  '/search': { url: '/pages/search.html', title: '� 길 찾기' },
  '/signin': { url: '/pages/signin.html', title: '👤 로그인' },
  '/signup': { url: '/pages/signup.html', title: '📝 회원가입' },
});

export const errorAlertMatch = {
  400: '중복된 이메일을 입력하셨습니다.',
  500: '오류가 발생하였습니다. 문제가 지속될 경우, 관리자에게 문의하시기 바랍니다.',
};

export const SIGN_UP_FAIL_MESSAGE = '회원가입에 실패하였습니다.';
