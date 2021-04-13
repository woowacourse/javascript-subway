import { $, hideElement } from '../../utils/dom';
import loginTemplate from './template';
import handleLogin from './eventHandlers/handleLogin';
import handleRoute from '../../eventHandlers/handleRoute';
import handleValidateLoginForm from './eventHandlers/handleValidateLoginForm';

const mountLogin = async () => {
  $('#route-container').innerHTML = loginTemplate;
  hideElement($('#nav'));

  $('#email').focus();

  $('#signup-link').addEventListener('click', handleRoute);
  $('#login-form').addEventListener('submit', handleLogin);
  $('#login-form').addEventListener('input', handleValidateLoginForm);
};

export default mountLogin;
