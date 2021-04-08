import { inputChecker } from '../../inputChecker/inputChecker';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { validateEmail } from '../../validators/validation';

export default class Email {
  selectDom() {
    this.$signInEmailInput = $(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`);
    this.$signInEmailCheckTextArea = $(`.${ELEMENT.SIGN_IN_EMAIL_CHECK_TEXT_AREA}`);
  }

  handleEmailCheck({ target }) {
    inputChecker.signIn({
      callback: validateEmail.bind(this, target.value),
      $textArea: this.$signInEmailCheckTextArea,
      $input: this.$signInEmailInput,
    });
  }
}
