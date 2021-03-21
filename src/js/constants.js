const ID_SELECTOR = {
  MAIN: 'main',
  MODAL: 'modal',

  SIGNUP_FORM: 'signup-form',
  SIGNUP_FORM_EMAIL: 'signup-form__email',
  SIGNUP_FORM_NAME: 'signup-form__name',
  SIGNUP_FORM_PASSWORD: 'signup-form__password',
  SIGNUP_FORM_PASSWORD_CONFIRM: 'signup-form__password-confirm',
  SIGNUP_FORM_SUBMIT: 'signup-form__submit',

  LOGIN_FORM: 'login-form',
  LOGIN_FORM_EMAIL: 'login-form__email',
  LOGIN_FORM_PASSWORD: 'login-form__password',
  LOGIN_FORM_SUBMIT: 'login-form__submit',
};

const CLASS_SELECTOR = {
  ANCHOR: 'js-anchor',
};

const ALERT_MESSAGE = {
  // SIGNUP
  SIGNUP_SUCCESS: '회원 가입에 성공했습니다.',
  DUPLICATED_EMAIL_FAIL: '중복된 이메일이 있습니다.',

  // LOGIN
  LOGIN_SUCCESS: '로그인에 성공했습니다.',
};

const REQUEST_URL = 'http://3.35.213.149';

export { ID_SELECTOR, CLASS_SELECTOR, ALERT_MESSAGE, REQUEST_URL };
