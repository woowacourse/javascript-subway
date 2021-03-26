import { goTo } from '../../../router/index.js';
import { fetchLogin, notify } from '../../../utils/index.js';
import { login } from '../../../auth/index.js';
import { AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

const requestLogin = async ({ formData }) => {
  try {
    const response = await fetchLogin(formData);

    if (!response.ok) {
      throw new Error(AUTH_MESSAGES.LOGIN_HAS_BEEN_FAILED);
    }

    const { accessToken } = await response.json();

    login(accessToken);
    notify(AUTH_MESSAGES.LOGIN_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.STATIONS);
  } catch (error) {
    notify(error.message);
  }
};

export default requestLogin;
