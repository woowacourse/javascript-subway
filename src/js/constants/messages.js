export const AUTH_MESSAGES = Object.freeze({
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
  LOGIN_HAS_BEEN_EXPIRED: '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.',
});

export const ROUTING_MESSAGES = Object.freeze({
  WELCOME: '지하철 노선도 앱에 오신 것을 환영합니다 💙',
  LOGIN_IS_REQUIRED: '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.',
  YOU_HAVE_NO_ACCESS_RIGHT: '잘못된 접근입니다.\n로그인 상태를 확인해 주세요',
  PATHNAME_IS_INVALID: (pathname) => `${pathname}은 잘못된 경로입니다.`,
  ROUTING_HAS_BEEN_FAILED: '요청하신 페이지에 접근할 수 없습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
});

export const STATIONS_MESSAGES = Object.freeze({
  STATION_NAME_ALREADY_EXISTS: '이미 존재하는 역 이름입니다.',
  STATION_HAS_BEEN_ADDED: '역 정보가 추가되었습니다.',
  STATION_HAS_BEEN_UPDATED: '역 정보가 변경되었습니다.',
  STATION_HAS_BEEN_REMOVED: '선택하신 역이 삭제되었습니다.',
  STATION_IS_REGISTERED_TO_LINE: '해당 역은 노선에 등록되어 있어 삭제할 수 없습니다.',
  ARE_YOU_SURE_TO_REMOVE: '정말 삭제하시겠습니까?',
  REQUEST_HAS_BEEN_FAILED: '요청 처리에 실패하였습니다.\n문제가 지속되면 관리자에게 문의해주세요.',
});

export const LINES_MESSAGES = Object.freeze({
  LINE_NAME_ALREADY_EXISTS: '이미 존재하는 노선 이름입니다.',
  LINE_HAS_BEEN_ADDED: '노선 정보가 추가되었습니다.',
  LINE_HAS_BEEN_UPDATED: '노선 정보가 변경되었습니다.',
  LINE_HAS_BEEN_REMOVED: '선택하신 노선이 삭제되었습니다.',
  ARE_YOU_SURE_TO_REMOVE: '정말 삭제하시겠습니까?',
});

export const SECTIONS_MESSAGES = Object.freeze({
  SECTION_HAS_BEEN_ADDED: '구간 정보가 추가되었습니다.',
  SECTION_NEEDS_TO_BE_SHORTER: '역과 역 사이 거리, 시간보다 작은 값을 입력해주세요.',
  SECTION_HAS_BEEN_REMOVED: '선택하신 구간이 삭제되었습니다.',
  THERE_IS_NO_SECTION_TO_REMOVE: '삭제가능한 구간이 없습니다.',
  ARE_YOU_SURE_TO_REMOVE: '정말 삭제하시겠습니까?',
});
