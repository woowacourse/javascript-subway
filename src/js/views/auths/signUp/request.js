import { API_ENDPOINT, AUTH_MESSAGES, ROUTES } from '../../../constants/index.js';
import { goTo } from '../../../router/index.js';
import { notify } from '../../../utils/index.js';

const requestSignUp = async (event) => {
  event.preventDefault();

  const { name: $name, email: $email, password: $password } = event.target.elements;

  try {
    const response = await fetch(API_ENDPOINT.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: $name.value,
        email: $email.value,
        password: $password.value,
      }),
    });

    if (!response.ok) {
      throw new Error(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_FAILED);
    }

    notify(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
    goTo(ROUTES.LOGIN);
  } catch (error) {
    notify(error.message);
  }
};

export default requestSignUp;
