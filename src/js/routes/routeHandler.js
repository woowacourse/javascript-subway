import { $, hideElement } from '../utils/dom';
import { routeTo } from '../utils/history';
import handleRoute from '../eventHandlers/handleRoute';
import handleLogin from '../eventHandlers/handleLogin';
import { requestCheckLogin } from '../services/auth';
import linesPageTemplate from '../templates/lines';
import loginTemplate from '../templates/login';
import mapPageTemplate from '../templates/map';
import searchPageTemplate from '../templates/search';
import sectionsPageTemplate from '../templates/sections';
import signupTemplate from '../templates/signup';
import stationsPageTemplate from '../templates/stations';
import handleSignup from '../eventHandlers/handleSignup';
import handleCheckEmail from '../eventHandlers/handleCheckEmail';
import handleValidateSignupForm from '../eventHandlers/handleValidateSignupForm';
import handleValidateLoginForm from '../eventHandlers/handleValidateLoginForm';
import handleAddStation from '../eventHandlers/handleAddStation';
import { requestStationList } from '../services/station';
import spinnerPageTemplate from '../templates/spinner';
import errorPageTemplate from '../templates/error';

const $routeContainer = $('#route-container');

export const mountLogin = async () => {
  $routeContainer.innerHTML = loginTemplate;
  hideElement($('#nav'));

  $('#email').focus();

  $('#signup-link').addEventListener('click', handleRoute);
  $('#login-form').addEventListener('submit', handleLogin);
  $('#login-form').addEventListener('input', handleValidateLoginForm);
};

export const mountSignup = async () => {
  const isLogin = await requestCheckLogin();

  if (isLogin) {
    routeTo('/');
    return;
  }

  $routeContainer.innerHTML = signupTemplate;
  hideElement($('#nav'));

  $('#email').focus();

  $('#email').addEventListener('input', handleCheckEmail);
  $('#signup-form').addEventListener('input', handleValidateSignupForm);
  $('#signup-form').addEventListener('submit', handleSignup);
};

export const mountSearch = () => {
  $routeContainer.innerHTML = searchPageTemplate;
};

export const mountSections = () => {
  $routeContainer.innerHTML = sectionsPageTemplate;
};

export const mountStations = async () => {
  $routeContainer.innerHTML = spinnerPageTemplate;

  const result = await requestStationList();

  if (!result.success) {
    alert(result.message);
    $routeContainer.innerHTML = errorPageTemplate;
    return;
  }

  $routeContainer.innerHTML = stationsPageTemplate(result.data);

  $('#station-form').addEventListener('submit', handleAddStation);
};

export const mountMap = () => {
  $routeContainer.innerHTML = mapPageTemplate;
};

export const mountLines = () => {
  $routeContainer.innerHTML = linesPageTemplate;
};
