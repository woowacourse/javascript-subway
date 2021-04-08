import { httpClient } from '../../api/httpClient';
import { inputChecker, renderCheckingArea } from '../../inputChecker/inputChecker';
import { ELEMENT, ERROR_MESSAGE } from '../../utils/constants';
import { $, deactivateTarget } from '../../utils/dom';
import { validateEmail } from '../../validators/validation';

export default class Email {
  selectDom() {
    this.$signUpEmailInput = $(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`);
    this.$signUpEmailCheckTextArea = $(`.${ELEMENT.SIGN_UP_EMAIL_CHECK_TEXT_AREA}`);
    this.$signUpSubmitButton = $(`.${ELEMENT.SIGN_UP_SUBMIT_BUTTON}`);
  }

  async handleEmailCheck({ target }) {
    const email = target.value;

    const emailValidationCheckPassed = inputChecker.signUp({
      callback: validateEmail.bind(this, email),
      $textArea: this.$signUpEmailCheckTextArea,
      $input: this.$signUpEmailInput,
    });

    if (!emailValidationCheckPassed) return;

    const emailDuplicationCheckPassed = await httpClient.get({
      path: `/members/check-validation?email=${email}`,
      isAlert: false,
    });

    if (!emailDuplicationCheckPassed) {
      renderCheckingArea({
        $textArea: this.$signUpEmailCheckTextArea,
        $input: this.$signUpEmailInput,
        errorMessage: ERROR_MESSAGE.DUPLICATED_EMAIL,
      });
      deactivateTarget(this.$signUpSubmitButton);
    }
  }
}
