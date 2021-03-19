import { ALERT_MESSAGE } from '../constants';
import { signup } from '../services/auth';
import { routeTo } from '../utils/history';

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

  const response = await signup(user);

  if (!response.success) {
    alert(response.message);
    return;
  }

  alert(ALERT_MESSAGE.SIGNUP_SUCCESS);

  routeTo('/');
};

export default handleSignup;
