export const isValidEmail = (email) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regExp.test(email);
};

export const isValidUserName = (userName) => {
  const regExp = /[^a-z가-힣]/i;

  return !regExp.test(userName);
};

export const isValidPassword = (password) => {
  return password.length >= 8;
};

export const isValidPasswordConfirm = (password, passwordConfirm) => {
  return password === passwordConfirm;
};
