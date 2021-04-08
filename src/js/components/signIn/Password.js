import { inputChecker } from '../../inputChecker/inputChecker';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { validatePassword } from '../../validators/validation';

export default class Password {
  selectDom() {
    this.$signInPasswordInput = $(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`);
    this.$signInPasswordCheckTextArea = $(`.${ELEMENT.SIGN_IN_PASSWORD_CHECK_TEXT_AREA}`);
  }

  handlePasswordCheck({ target }) {
    inputChecker.signIn({
      callback: validatePassword.bind(this, target.value),
      $textArea: this.$signInPasswordCheckTextArea,
      $input: this.$signInPasswordInput,
    });
  }
}
