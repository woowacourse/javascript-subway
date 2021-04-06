import { inputChecker } from '../../inputChecker/inputChecker';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { validatePasswordConfirm } from '../../validators/validation';

export default class PasswordConfirm {
  selectDom() {
    this.$signUpPasswordInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`);
    this.$signUpPasswordConfirmInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`);
    this.$signUpPasswordConfirmCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA}`);
  }

  handlePasswordConfirmCheck({ target }) {
    inputChecker.signUp({
      callback: validatePasswordConfirm.bind(this, this.$signUpPasswordInput.value, target.value),
      $textArea: this.$signUpPasswordConfirmCheckTextArea,
      $input: this.$signUpPasswordConfirmInput,
    });
  }
}
