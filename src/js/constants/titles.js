import ROUTES from './routes.js';

const TITLES = Object.freeze({
  [ROUTES.HOME]: '지하철 노선도',
  [ROUTES.STATIONS]: '역 관리',
  [ROUTES.LINES]: '노선 관리',
  [ROUTES.SECTIONS]: '구간 관리',
  [ROUTES.LOGIN]: '로그인',
  [ROUTES.SIGN_UP]: '회원가입',
});

export default TITLES;
