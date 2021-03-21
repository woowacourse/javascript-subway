const AUTH_MESSAGES = Object.freeze({
  USER_NAME_IS_REQUIRED: '사용자 이름을 입력해주세요.',
  USER_EMAIL_IS_REQUIRED: '이메일을 입력해주세요.',
  USER_EMAIL_TYPE_IS_MISMATCHED: '잘못된 이메일 형식입니다. 다시 입력해주세요.',
  USER_EMAIL_IS_DUPLICATED: '이미 사용되고 있는 이메일입니다. 다른 이메일을 입력해주세요.',
  USER_PASSWORD_IS_REQUIRED: '비밀번호를 입력해주세요.',
  SIGN_UP_HAS_BEEN_COMPLETED: '회원가입이 성공적으로 완료되었습니다.',
  SIGN_UP_HAS_BEEN_FAILED: '회원가입에 실패하였습니다.\n이 현상이 반복되면 관리자에게 문의해주시기 바랍니다.',
  LOGIN_HAS_BEEN_FAILED: '로그인에 실패하였습니다. 아이디 또는 비밀번호를 확인해주세요.',
  LOGIN_HAS_BEEN_COMPLETED: '로그인에 성공하였습니다.',
});

export default AUTH_MESSAGES;
