class ValidationError extends Error {
  constructor(message) {
    super(message);
  }

  handleError($check) {
    $check.classList.remove('correct');
    $check.innerText = this.message;
  }
}

export default ValidationError;
