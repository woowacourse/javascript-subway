import { $, activateTarget, deactivateTarget } from '../utils/dom';
import { isAllSignInInputSuccess, isAllSignUpInputSuccess } from '../validators/boolean';
import { ELEMENT, SUCCESS, INPUT_CHECK_MODE } from '../utils/constants';

const toggleSubmitActivation = (isAllInputSuccess) => {
  const $submitButton = $(`.${ELEMENT.INPUT_SUBMIT}`);
  isAllInputSuccess ? activateTarget($submitButton) : deactivateTarget($submitButton);
};

export const renderCheckingArea = ({ $textArea, $input, errorMessage }) => {
  $textArea.innerText = errorMessage ?? '';
  $input.classList.remove(ELEMENT.SUCCESS, ELEMENT.FAIL);
  $input.classList.add(`${errorMessage ? ELEMENT.FAIL : ELEMENT.SUCCESS}`);
};

export const inputChecker = async ({ callback, $textArea, $input, mode }) => {
  try {
    await callback();
    renderCheckingArea({ $textArea, $input });

    if (mode === INPUT_CHECK_MODE.SIGN_UP) toggleSubmitActivation(isAllSignUpInputSuccess());
    if (mode === INPUT_CHECK_MODE.SIGN_IN) toggleSubmitActivation(isAllSignInInputSuccess());

    return SUCCESS;
  } catch (error) {
    renderCheckingArea({ $textArea, $input, errorMessage: error.message });
    toggleSubmitActivation(false);
  }
};
