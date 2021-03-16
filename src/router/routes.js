import { PATH } from '../constants';

// TODO : TITLE 같은 건 객체 속성으로 넣기
const ROUTES = Object.freeze({
  [PATH.ROOT]: '/pages/main.html',
  [PATH.LINES]: '/pages/lines.html',
  [PATH.STATIONS]: '/pages/stations.html',
  [PATH.SECTIONS]: '/pages/sections.html',
  [PATH.SIGN_UP]: '/pages/signup.html',
  [PATH.LOG_IN]: '/pages/login.html',
  [PATH.SUBWAY]: '/pages/subway.html',
  [PATH.SEARCH]: '/pages/search.html',
});

export default ROUTES;
