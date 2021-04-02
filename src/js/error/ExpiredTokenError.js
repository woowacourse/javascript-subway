class ExpiredTokenError extends Error {
  constructor(message) {
    super(message);
  }
}

export default ExpiredTokenError;
