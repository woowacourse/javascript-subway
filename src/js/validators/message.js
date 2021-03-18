import { isValidEmail, isValidUserName, isValidPassword, isValidPasswordConfirm } from './validation.js';

export const getInvalidSignUpMessage = ({ email, userName, password, passwordConfirm }) => {
  if (!isValidEmail(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  if (!isValidUserName(userName)) {
    return '이름이 올바르지 않습니다.';
  }

  if (!isValidPassword(password)) {
    return '비밀번호는 8자 이상으로 입력하셔야 합니다.';
  }

  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    return '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.';
  }

  return '';
};
