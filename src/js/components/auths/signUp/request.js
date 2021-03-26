import { goTo } from '../../../router/index.js';
import { notify, fetchSignUp } from '../../../utils/index.js';
import { AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

const requestSignUp = async ({ formData }) => {
  try {
    const response = await fetchSignUp(formData);

    if (!response.ok) {
      throw new Error(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_FAILED);
    }

    notify(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.LOGIN);
  } catch (error) {
    notify(error.message);
  }
};

export default requestSignUp;
