import { goTo } from '../../../router/index.js';
import { notify } from '../../../utils/index.js';
import { API_ENDPOINT, AUTH_MESSAGES, ROUTES } from '../../../constants/index.js';
import { login } from '../../../auth/index.js';

const requestLogin = async (event) => {
  event.preventDefault();

  const { email: $email, password: $password } = event.target.elements;

  try {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    if (!response.ok) {
      throw new Error(AUTH_MESSAGES.LOGIN_HAS_BEEN_FAILED);
    }

    const { accessToken } = await response.json();

    login(accessToken);
    notify(AUTH_MESSAGES.LOGIN_HAS_BEEN_COMPLETED);
    goTo(ROUTES.STATIONS);
  } catch (error) {
    notify(error.message);
  }
};

export default requestLogin;
