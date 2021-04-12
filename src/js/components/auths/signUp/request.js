import { goTo } from '../../../router/index.js';
import { reportError, showNotification, toStringFromFormData } from '../../../utils/index.js';
import { API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE, HEADERS } from '../../../constants/index.js';

export default async function requestSignUp({ formData }) {
  try {
    const response = await fetchSignUp(formData);

    if (response.status === STATUS_CODE.SIGN_UP.EMAIL_DUPLICATED) {
      showNotification(AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED);
      return;
    }

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`[status code: ${response.status}] ${body}`);
    }

    showNotification(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.LOGIN);
  } catch (error) {
    reportError({
      messageToUser: AUTH_MESSAGES.SIGN_UP_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

async function fetchSignUp(formData) {
  const response = await fetch(API_ENDPOINT.SIGN_UP, {
    method: 'POST',
    headers: HEADERS,
    body: toStringFromFormData(formData),
  });

  return response;
}
