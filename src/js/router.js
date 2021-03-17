import { getLinesInfo } from './templates/lines.js';
import { getLoginInfo } from './templates/login.js';
import { getStationsInfo } from './templates/stations.js';
import { getSectionsInfo } from './templates/sections.js';

export const init = () => {
  document.querySelector('.menu').addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName !== 'BUTTON') return;
    const href = e.target.closest('.menu__link').getAttribute('href');

    getHistory(href);
  });
};

const getHistory = href => {
  const key = href.replace('/', '');
  // TODO data 불러오기 + getHistory 내부 로직 개선
  const data = {};
  const func = router(data);
  const { title = '', contents } = func[key];
  history.pushState({ contents }, title, href);
  render();
};

const render = () => {
  const $container = document.querySelector('.container');
  const $modal = document.querySelector('.modal');
  const { main = '', modal = '' } = history.state.contents;
  $container.innerHTML = main;
  $modal.innerHTML = modal;
};

const router = data => {
  return {
    stations: getStationsInfo(data),
    sections: getSectionsInfo(data),
    lines: getLinesInfo(data),
    login: getLoginInfo(data),
  };
};
