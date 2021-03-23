import { $, activateTarget, deactivateTarget } from '../utils/dom';
import { isAllSignInInputSuccess, isAllSignUpInputSuccess } from '../validators/boolean';
import { INPUT_FIELD, ELEMENT } from '../utils/constants';

const toggleSubmitActivation = (isAllInputSuccess) => {
  const $submitButton = $(ELEMENT.INPUT_SUBMIT);
  isAllInputSuccess ? activateTarget($submitButton) : deactivateTarget($submitButton);
};

export const renderCheckingArea = ({ $textArea, $input, errorMessage }) => {
  $textArea.innerText = errorMessage ?? '';
  $input.classList.remove(INPUT_FIELD.SUCCESS, INPUT_FIELD.FAIL);
  $input.classList.add(`${errorMessage ? INPUT_FIELD.FAIL : INPUT_FIELD.SUCCESS}`);
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
