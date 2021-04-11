import { showNotification } from './notify.js';
import { logout } from '../auth/index.js';
import { goTo } from '../router/index.js';
import { STATUS_CODE, AUTH_MESSAGES, PATHNAMES } from '../constants/index.js';

const authHandlers = {
  [STATUS_CODE.AUTH_FAILED]: () => {
    showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
    logout();
    goTo(PATHNAMES.LOGIN);
  },
};

const defaultHandler = async (response) => {
  const errorMessage = await response.text();
  throw new Error(`[status code: ${response.status}] ${errorMessage}`);
};

const handleException = async (response, customHandlers = {}) => {
  const handlers = { ...customHandlers, authHandlers };

  return handlers[response.status] ? handlers[response.status]() : defaultHandler(response);
};

export default handleException;
