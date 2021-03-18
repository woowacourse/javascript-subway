import { deepFreeze } from './deepFreeze.js';

export const routes = deepFreeze({
  '/': ['/', '🚇 지하철 노선도'],
  '/stations': ['/pages/stations.html', '🚉 역 관리'],
  '/lines': ['/pages/lines.html', '🛤 노선 관리'],
  '/sections': ['/pages/sections.html', '🔁 구간 관리'],
  '/map': ['/pages/map.html', '🗺️ 전체 보기'],
  '/search': ['/pages/search.html', '� 길 찾기'],
  '/signin': ['/pages/signin.html', '👤 로그인'],
  '/signup': ['/pages/signup.html', '📝 회원가입'],
});
