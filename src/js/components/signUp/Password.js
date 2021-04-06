import { inputChecker } from '../../inputChecker/inputChecker';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { validatePassword, validatePasswordConfirm } from '../../validators/validation';

export default class Password {
  selectDom() {
    this.$signUpPasswordInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`);
    this.$signUpPasswordCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CHECK_TEXT_AREA}`);
    this.$signUpPasswordConfirmInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`);
    this.$signUpPasswordConfirmCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA}`);
  }

  handlePasswordCheck({ target }) {
    const passwordValidationCheckPassed = inputChecker.signUp({
      callback: validatePassword.bind(this, target.value),
      $textArea: this.$signUpPasswordCheckTextArea,
      $input: this.$signUpPasswordInput,
    });

    if (!passwordValidationCheckPassed) return;

    inputChecker.signUp({
      callback: validatePasswordConfirm.bind(this, target.value, this.$signUpPasswordConfirmInput.value),
      $textArea: this.$signUpPasswordConfirmCheckTextArea,
      $input: this.$signUpPasswordConfirmInput,
    });
  }
}
