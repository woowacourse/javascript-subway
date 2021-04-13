import { routeTo } from '../../../utils/history';
import { initPrivateStore } from '../../../store';
import { AUTH } from '../../../constants/alertMessage';
import { $, showElement } from '../../../utils/dom';
import { login } from '../../../services/auth';
import snackbar from '../../../utils/snackbar';

const handleLogin = async event => {
  event.preventDefault();

  const { email, password, 'keep-login': keepLogin } = event.target.elements;

  const isSuccess = await login(email.value, password.value, { keepLogin: keepLogin.checked });

  if (!isSuccess) {
    snackbar.open(AUTH.LOGIN_FAILED);
    return;
  }

  try {
    await initPrivateStore();
    routeTo('/');
    showElement($('#nav'));
  } catch (error) {
    snackbar.open(error.message);
    routeTo('/login');
  }
};

export default handleLogin;
