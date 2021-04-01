import { fetchLogin } from '../../API/auth';
import { COOKIE_KEY } from '../../constants/constants';
import { MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages';
import { PATH } from '../../constants/path';
import jwtToken from '../../jwtToken';
import router from '../../router';
import showSnackBar from '../../utils/snackbar';

async function loginHandler({ target }) {
  const loginData = {
    email: target.elements.email.value,
    password: target.elements.password.value,
  };

  try {
    const response = await fetchLogin(loginData);

    if (!response.ok) {
      throw response;
    }

    const { accessToken } = await response.json();
    jwtToken.setToken(COOKIE_KEY.JWT_TOKEN, accessToken);

    showSnackBar(SNACKBAR_MESSAGE.SUCCESS.LOGIN);
  } catch (response) {
    console.error('login error');
    alert(MESSAGE.ERROR.CHECK_EMAIL_AND_PASSWORD);
  } finally {
    router.navigate(PATH.ROOT);
  }
}

export { loginHandler };
