const MESSAGE = {
  ERROR: {
    PAGE_NOT_FOUND: '존재하지 않는 페이지입니다.',
    FAIL_TO_SIGNUP: '회원가입에 실패 하셨습니다. 다시 시도 해주세요.',
    DUPLICATED_EMAIL: '중복된 이메일입니다.',
    WRONG_EMAIL_FORMAT: '알맞은 이메일 형식을 입력해 주세요.',
    CHECK_EMAIL_AND_PASSWORD: '이메일과 비밀번호를 확인해주세요.',
  },
  SUCCESS: {
    AVAILABLE_EMAIL: '사용가능한 이메일 입니다.',
  },
};

const ALERT_MESSAGE = {
  ERROR: {
    NOT_CHECKED_EMAIL: '이메일 중복 체크를 해주세요',
    INVALID_USER: '로그인이 만료되었습니다.',
    FAIL_TO_ADD_STATION: '지하철 역 추가에 실패했습니다.',
    FAIL_TO_MODIFY_STATION: '지하철 역 수정에 실패했습니다.',
    FAIL_TO_DELETE_STATION: '지하철 역 삭제에 실패했습니다.',
    FAIL_TO_ADD_LINE: '노선 추가에 실패했습니다.',
    FAIL_TO_MODIFY_LINE: '노선 수정에 실패했습니다.',
    FAIL_TO_DELETE_LINE: '노선 삭제에 실패했습니다.',
    FAIL_TO_ADD_SECTION: '구간 추가에 실패했습니다.',
    FAIL_TO_MODIFY_SECTION: '구간 수정에 실패했습니다.',
    FAIL_TO_DELETE_SECTION: '구간 삭제에 실패했습니다.',
    INCLUDED_STATION: '노선에 포함된 지하철 역입니다.',
    DUPLICATED_STATION_NAME: '중복된 지하철 역 이름입니다.',
    DUPLICATED_LINE_NAME: '중복된 노선 이름입니다.',
    DUPLICATED_UP_DOWN_STATIONS: '서로 다른 종점역을 선택해주세요.',
  },
};

const SNACKBAR_MESSAGE = {
  SUCCESS: {
    SIGNUP: '회원가입에 성공했습니다.',
    LOGIN: '로그인에 성공했습니다.',
    LOGOUT: '로그아웃에 성공했습니다.',
    ADD_STATION: '지하철 역을 추가했습니다.',
    MODIFY_STATION: '지하철 역을 수정했습니다.',
    DELETE_STATION: '지하철 역을 삭제했습니다.',
    ADD_LINE: '노선 추가를 성공했습니다.',
    MODIFY_LINE: '노선 수정에 성공했습니다.',
    DELETE_LINE: '노선 삭제를 성공했습니다.',
    ADD_SECTION: '구간 추가를 성공했습니다.',
    MODIFY_SECTION: '구간 수정에 성공했습니다.',
    DELETE_SECTION: '구간 삭제를 성공했습니다.',
  },
};

const CONFIRM_MESSAGE = {
  DELETE_STATION: '지하철 역을 삭제하시겠습니까?',
  DELETE_LINE: '노선을 삭제하시겠습니까?',
  DELETE_SECTION: '구간을 삭제하시겠습니까?',
};

export { MESSAGE, SNACKBAR_MESSAGE, CONFIRM_MESSAGE, ALERT_MESSAGE };
