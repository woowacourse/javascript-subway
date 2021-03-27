const AUTH_MESSAGES = Object.freeze({
  USER_NAME_IS_REQUIRED: '사용자 이름을 입력해주세요.',
  USER_NAME_IS_AVAILABLE: '사용할 수 있는 사용자 이름입니다.',
  USER_EMAIL_IS_REQUIRED: '이메일을 입력해주세요.',
  USER_EMAIL_TYPE_IS_MISMATCHED: '잘못된 이메일 형식입니다. 다시 입력해주세요.',
  USER_EMAIL_IS_DUPLICATED: '이미 사용되고 있는 이메일입니다. 다른 이메일을 입력해주세요.',
  USER_EMAIL_IS_AVAILABLE: '사용할 수 있는 이메일입니다.',
  USER_PASSWORD_IS_REQUIRED: '비밀번호를 입력해주세요.',
  USER_PASSWORD_IS_AVAILABLE: '사용할 수 있는 비밀번호입니다.',
  SIGN_UP_HAS_BEEN_COMPLETED: '회원가입이 성공적으로 완료되었습니다.',
  SIGN_UP_HAS_BEEN_FAILED: '회원가입에 실패하였습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
  USER_EMAIL_OR_PASSWORD_IS_INVALID: '로그인에 실패하였습니다. 아이디 또는 비밀번호를 확인해주세요.',
  LOGIN_HAS_BEEN_FAILED: '로그인에 실패하였습니다. \n문제가 지속되면 관리자에게 문의해주세요.',
  LOGIN_HAS_BEEN_COMPLETED: '로그인에 성공하였습니다.',
  INPUT_VALIDATION_HAS_BEEN_FAILED: '입력하신 내용을 검사할 수 없습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
});

const ROUTING_MESSAGES = Object.freeze({
  WELCOME: '지하철 노선도 앱에 오신 것을 환영합니다 💙',
  LOGIN_IS_REQUIRED: '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',
  YOU_HAVE_NO_ACCESS_RIGHT: '잘못된 접근입니다.\n로그인 상태를 확인해 주세요',
  PATHNAME_IS_INVALID: (pathname) => `${pathname}은 잘못된 경로입니다.`,
  ROUTING_HAS_BEEN_FAILED: '요청하신 페이지에 접근할 수 없습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
});

export { AUTH_MESSAGES, ROUTING_MESSAGES };
