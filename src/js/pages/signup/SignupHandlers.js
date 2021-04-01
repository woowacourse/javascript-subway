import { $ } from '../../utils/DOM.js';
import { fetchSignup, fetchToCheckDuplicatedEmail } from '../../API/auth.js';
import { MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import router from '../../router.js';
import showSnackBar from '../../utils/snackbar.js';

async function signupHandler({ target }) {
  const signupData = {
    email: target.elements.email.value,
    name: target.elements.name.value,
    password: target.elements.password.value,
  };

  try {
    const response = await fetchSignup(signupData);

    if (!response.ok) {
      throw response;
    }

    showSnackBar(SNACKBAR_MESSAGE.SUCCESS.SIGNUP);
    router.navigate(PATH.ROOT);
  } catch (resposne) {
    console.error(await response.text());
    alert(MESSAGE.ERROR.FAIL_TO_SIGNUP);

    router.navigate(PATH.SIGNUP);
  }
}

async function checkDuplicatedEmailHandler() {
  const email = $('#email').value;

  try {
    const response = await fetchToCheckDuplicatedEmail(email);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

export { signupHandler, checkDuplicatedEmailHandler };
