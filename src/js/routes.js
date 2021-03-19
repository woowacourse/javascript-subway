import { $, showElement, hideElement } from './utils/dom';
import { ALERT_MESSAGE } from './constants';
import { signup, login, checkLogin } from './services/auth';
import loginTemplate from './templates/login';
import signupTemplate from './templates/signup';
import stationsPageTemplate from './templates/stations';
import searchPageTemplate from './templates/search';
import sectionsPageTemplate from './templates/sections';
import mapPageTemplate from './templates/map';
import linesPageTemplate from './templates/lines';
import handleRoute from './eventHandlers/handleRoute';
import { pushState } from './utils/history';
import accessToken from './store/accessToken';

// TODO: mount함수들 분리하기
const $routeContainer = $('#route-container');

const mountLogin = async () => {
  const isLogin = await checkLogin();
  if (isLogin) return pushState('/');

  $routeContainer.innerHTML = loginTemplate;
  hideElement($('#nav'));

  $('#signup-link').addEventListener('click', handleRoute);

  $('#login-form').addEventListener('submit', async event => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const response = await login({
      email: email.value,
      password: password.value,
    });

    if (!response.success) {
      alert(ALERT_MESSAGE.LOGIN_FAILED);
      return;
    }

    const newAccessToken = response.accessToken;

    accessToken.set(newAccessToken);
    showElement($('#nav'));
    pushState('/');
  });
};

const mountSignup = () => {
  $routeContainer.innerHTML = signupTemplate;

  $('#signup-form').addEventListener('submit', async event => {
    event.preventDefault();

    const { email, password, 'password-confirm': passwordConfirm, name } = event.target.elements;

    if (password.value !== passwordConfirm.value) {
      alert(ALERT_MESSAGE.INVALID_PASSWORD_CONFIRM);
      return;
    }

    const user = {
      email: email.value,
      password: password.value,
      name: name.value,
    };

    const response = await signup(user);

    if (!response.success) {
      alert(response.message);
      return;
    }

    alert(ALERT_MESSAGE.SIGNUP_SUCCESS);

    pushState('/');
  });
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

const checkAuth = async route => {
  const isLogin = await checkLogin();

  if (isLogin) {
    route();
  } else {
    pushState('/login');
  }
};

const routeHandler = {
  '/': () => checkAuth(mountStations),
  '/login': mountLogin,
  '/signup': mountSignup,
  '/search': () => checkAuth(mountSearch),
  '/sections': () => checkAuth(mountSections),
  '/stations': () => checkAuth(mountStations),
  '/map': () => checkAuth(mountMap),
  '/lines': () => checkAuth(mountLines),
};

const initRouter = () => {
  window.addEventListener('popstate', event => {
    routeHandler[event.state.path]();
  });

  window.addEventListener('pushstate', event => {
    const { path } = event.detail;
    routeHandler[path]();
  });

  routeHandler['/']();
};

export default initRouter;
