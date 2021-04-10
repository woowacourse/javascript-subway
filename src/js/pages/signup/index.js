import { routeTo } from '../../utils/history';
import { $, hideElement } from '../../utils/dom';
import signupTemplate from './template';
import handleValidateSignupForm from './eventHandlers/handleValidateSignupForm';
import handleSignup from './eventHandlers/handleSignup';
import handleCheckEmail from './eventHandlers/handleCheckEmail';
import handleRoute from '../../eventHandlers/handleRoute';
import { requestCheckLogin } from '../../api/auth';

const mountSignup = async () => {
  const isLogin = await requestCheckLogin();

  if (isLogin) {
    routeTo('/');
    return;
  }

  $('#route-container').innerHTML = signupTemplate;
  hideElement($('#nav'));

  $('#email').focus();

  $('#email').addEventListener('input', handleCheckEmail);
  $('#signup-form').addEventListener('input', handleValidateSignupForm);
  $('#signup-form').addEventListener('submit', handleSignup);
  $('#login-link').addEventListener('click', handleRoute);
};

export default mountSignup;
