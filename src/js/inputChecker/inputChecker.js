import { $, activateTarget, deactivateTarget } from '../utils/dom';
import { isAllSignInInputSuccess, isAllSignUpInputSuccess } from '../validators/boolean';
import { ELEMENT } from '../utils/constants';

const toggleSubmitActivation = (isAllInputSuccess) => {
  const $submitButton = $(`.${ELEMENT.INPUT_SUBMIT}`);
  isAllInputSuccess ? activateTarget($submitButton) : deactivateTarget($submitButton);
};

export const renderCheckingArea = ({ $textArea, $input, errorMessage }) => {
  $textArea.innerText = errorMessage ?? '';
  $input.classList.remove(ELEMENT.SUCCESS, ELEMENT.FAIL);
  $input.classList.add(`${errorMessage ? ELEMENT.FAIL : ELEMENT.SUCCESS}`);
};

const checkInputInRealTime = ({ callback, $textArea, $input }, isAllInputSuccess) => {
  try {
    callback();
    renderCheckingArea({ $textArea, $input });
    toggleSubmitActivation(isAllInputSuccess());
  } catch (error) {
    renderCheckingArea({ $textArea, $input, errorMessage: error.message });
    toggleSubmitActivation(false);
    throw error;
  }
};

export const inputChecker = {
  signUp: ({ callback, $textArea, $input }) =>
    checkInputInRealTime({ callback, $textArea, $input }, isAllSignUpInputSuccess),
  signIn: ({ callback, $textArea, $input }) =>
    checkInputInRealTime({ callback, $textArea, $input }, isAllSignInInputSuccess),
};
