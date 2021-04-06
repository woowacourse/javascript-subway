import { inputChecker } from '../../inputChecker/inputChecker';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { validateName } from '../../validators/validation';

export default class UserName {
  selectDom() {
    this.$signUpUserNameInput = $(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`);
    this.$signUpUserNameCheckTextArea = $(`.${ELEMENT.SIGN_UP_USER_NAME_CHECK_TEXT_AREA}`);
  }

  handleUserNameCheck({ target }) {
    inputChecker.signUp({
      callback: validateName.bind(this, target.value),
      $textArea: this.$signUpUserNameCheckTextArea,
      $input: this.$signUpUserNameInput,
    });
  }
}
