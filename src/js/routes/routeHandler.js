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
import handleSignup from '../eventHandlers/handleSignup';
import handleCheckEmail from '../eventHandlers/handleCheckEmail';
import handleValidateSignupForm from '../eventHandlers/handleValidateSignupForm';
import handleValidateLoginForm from '../eventHandlers/handleValidateLoginForm';
import handleAddStation from '../eventHandlers/handleAddStation';
import errorPageTemplate from '../templates/error';
import stationsPageTemplate from '../templates/stations';
import handleStationStatus from '../eventHandlers/handleStationStatus';
import { modalCloseEventInit } from '../utils/modal';
import handleEditStation from '../eventHandlers/handleEditStation';
import handleAddLine from '../eventHandlers/handleAddLine';
import handleSelectColor from '../eventHandlers/handleSelectColor';
import handleOpenLineAddModal from '../eventHandlers/handleOpenLineAddModal';
import handleSelectDepartureStation from '../eventHandlers/handleSelectDepartureStation';
import handleLineStatus from '../eventHandlers/handleLineStatus';
import store from '../store';

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

export const mountStations = () => {
  $routeContainer.innerHTML = stationsPageTemplate(store.station.get());

  $('#station-form').addEventListener('submit', handleAddStation);
  $('#station-list').addEventListener('click', handleStationStatus);
  $('#station-name-edit-form').addEventListener('submit', handleEditStation);

  modalCloseEventInit('#station-name-edit-modal');
};

export const mountMap = () => {
  $routeContainer.innerHTML = mapPageTemplate;
};

export const mountLines = () => {
  $routeContainer.innerHTML = linesPageTemplate(store.line.get());

  $('#create-line-button').addEventListener('mousedown', handleOpenLineAddModal);
  $('#line-add-form').addEventListener('submit', handleAddLine);
  $('.subway-line-color-selector').addEventListener('click', handleSelectColor);
  $('#departure-station').addEventListener('change', handleSelectDepartureStation);
  $('.js-line-list').addEventListener('click', handleLineStatus);

  modalCloseEventInit('#line-add-modal');
};

export const mountError = () => {
  $routeContainer.innerHTML = errorPageTemplate;
};
