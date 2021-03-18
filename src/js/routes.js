import { $, showElement, hideElement } from './utils/dom';
import { ALERT_MESSAGE, LOCAL_STORAGE_KEYS } from './constants';
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
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

// TODO: mount함수들 분리하기
const $routeContainer = $('#route-container');

const mountLogin = async () => {
  const isLogin = await checkLogin();

  if (isLogin) pushState('/');

  $routeContainer.innerHTML = loginTemplate;
  hideElement('#nav');

  $('#signup-link').addEventListener('click', handleRoute);

  $('#login-form').addEventListener('submit', async event => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    // const response = await login({
    //   email: email.value,
    //   password: password.value,
    // });

    // if (!response.success) {
    //   alert('login fail');
    //   return;
    // }

    // const { accessToken } = response;

    const accessToken = 'dummy';

    setLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    showElement('#nav');
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

    alert('회원가입 성공!');

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

let hi = false;

const checkAuth = async route => {
  const isLogin = hi; //await checkLogin();

  hi = true;
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
    console.log(event);
    routeHandler[event.state.path]();
  });

  window.addEventListener('pushstate', event => {
    const { path } = event.detail;
    routeHandler[path]();
  });

  routeHandler['/']();
};

export default initRouter;
