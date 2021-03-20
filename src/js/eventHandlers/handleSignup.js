import { ALERT_MESSAGE } from '../constants';
import { requestSignup } from '../services/auth';
import { $, showElement } from '../utils/dom';
import { routeTo } from '../utils/history';
import { login } from './handleLogin';

const handleSignup = async event => {
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

  const response = await requestSignup(user);

  if (!response.success) {
    alert(response.message);
    return;
  }

  alert(ALERT_MESSAGE.SIGNUP_SUCCESS);

  await login(email.value, password.value);
  showElement($('#nav'));
  routeTo('/');
};

export default handleSignup;
