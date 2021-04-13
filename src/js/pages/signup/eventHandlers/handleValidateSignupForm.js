import { $ } from '../../../utils/dom';

const isValidForm = ({ password, 'password-confirm': passwordConfirm, name }) => {
  return (
    $('#email-check-message').textContent === '✔️' && password.value === passwordConfirm.value && name.value.length
  );
};

const handleValidateSignupForm = ({ target }) => {
  const $form = target.closest('#signup-form');
  const { submit } = $form.elements;

  submit.disabled = !isValidForm($form.elements);
};

export default handleValidateSignupForm;
