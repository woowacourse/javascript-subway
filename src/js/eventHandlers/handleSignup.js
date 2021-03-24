import { AUTH } from '../constants/alertMessage';
import { requestSignup } from '../services/auth';
import { $, showElement } from '../utils/dom';
import { routeTo } from '../utils/history';
import { login } from './handleLogin';

const handleSignup = async event => {
  event.preventDefault();

  const { email, password, name } = event.target.elements;

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

  alert(AUTH.SIGNUP_SUCCESS);

  await login(email.value, password.value, { keepLogin: false });
  showElement($('#nav'));
  routeTo('/');
};

export default handleSignup;
