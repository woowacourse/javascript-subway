const isValidForm = ({ email, password }) => {
  return email.value && password.value;
};

const handleValidateLoginForm = ({ target }) => {
  const $form = target.closest('#login-form');
  const { submit } = $form.elements;

  submit.disabled = !isValidForm($form.elements);
};

export default handleValidateLoginForm;
