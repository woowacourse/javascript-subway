const updateSubmitButtonState = ({ currentTarget }) => {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
};

export default updateSubmitButtonState;
