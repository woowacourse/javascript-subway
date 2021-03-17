import { $ } from './utils/dom';
import loginTemplate from './templates/login';
import stationsPageTemplate from './templates/stations';
import searchPageTemplate from './templates/search';
import sectionsPageTemplate from './templates/sections';
import mapPageTemplate from './templates/map';
import linesPageTemplate from './templates/lines';

// TODO: mount함수들 분리하기
const $routeContainer = $('#route-container');

const mountMain = () => {
  $routeContainer.innerHTML = '<h1>main</h1>';
};

const mountLogin = () => {
  $routeContainer.innerHTML = loginTemplate;
  // TODO: render 후 이벤트 핸들러 적용
};

const mountSearch = () => {
  $routeContainer.innerHTML = searchPageTemplate;
};

const mountSections = () => {
  $routeContainer.innerHTML = sectionsPageTemplate;
};

const mountStations = () => {
  $routeContainer.innerHTML = stationsPageTemplate;
};

const mountMap = () => {
  $routeContainer.innerHTML = mapPageTemplate;
};

const mountLines = () => {
  $routeContainer.innerHTML = linesPageTemplate;
};

const routeHandler = {
  '/': mountMain,
  '/login': mountLogin,
  '/search': mountSearch,
  '/sections': mountSections,
  '/stations': mountStations,
  '/map': mountMap,
  '/lines': mountLines,
};

const initRouter = () => {
  window.addEventListener('popstate', e => {
    routeHandler[e.state.path]();
  });

  window.addEventListener('pushstate', event => {
    const { path } = event.detail;
    routeHandler[path]();
  });

  routeHandler['/']();
};

export default initRouter;
