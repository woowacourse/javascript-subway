import { goTo } from '../../../router/index.js';
import { fetchLogin, showNotification, reportError } from '../../../utils/index.js';
import { login } from '../../../auth/index.js';
import { AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

const requestLogin = async ({ formData }) => {
  try {
    const response = await fetchLogin(formData);

    if (response.status === STATUS_CODE.LOGIN.FAILED) {
      showNotification(AUTH_MESSAGES.USER_EMAIL_OR_PASSWORD_IS_INVALID);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    const { accessToken } = await response.json();

    login(accessToken);
    showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.STATIONS);
  } catch (error) {
    reportError({
      messageToUser: AUTH_MESSAGES.LOGIN_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
};

export default requestLogin;
