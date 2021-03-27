import { STATIONS, LINES } from './index.js';

export const MESSAGE = {
  REQUIRE_LOGIN: '로그인이 필요합니다.',
  DELETE_CONFIRM: (name) => `${name}을(를) 삭제하시겠습니까?`,
};

export const SNACKBAR_MESSAGE = {
  IS_NOT_VALID_STATION_NAME_LENGTH: `역 이름은 ${STATIONS.MIN_STATION_NAME_LENGTH}글자 이상, ${STATIONS.MAX_STATION_NAME_LENGTH}글자 이하만 입력 가능합니다.`,
  MATCH_CONFIRM_PASSWORD: '비밀번호가 일치합니다.',
  NOT_MATCH_CONFIRM_PASSWORD: '비밀번호가 일치하지 않습니다.',
  REQUIRE_CHECK_EMAIL: '이메일의 중복 여부를 확인해주세요.',
  IS_NOT_VALID_EMAIL: '유효하지 않은 이메일입니다.',
  IS_DUPLICATE_EMAIL: '중복된 이메일입니다. 다른 이메일을 입력해주세요.',
  IS_NOT_DUPLICATE_EMAIL: '사용가능한 이메일입니다.',
  SIGNUP_SUCCESS: '회원가입에 성공하였습니다.',
  SIGNUP_FAILURE: '회원가입에 실패하였습니다.',
  LOGIN_SUCCESS: '로그인에 성공하였습니다.',
  LOGIN_FAILURE: '로그인에 실패하였습니다.',
  LOGOUT_SUCCESS: '로그아웃 되었습니다.',
  CREATE_SUCCESS: '성공적으로 생성하였습니다.',
  CREATE_FAILURE: '생성에 실패하였습니다.',
  DELETE_SUCCESS: '성공적으로 삭제하였습니다.',
  DELETE_FAILURE: '삭제에 실패하였습니다.',
  EDIT_SUCCESS: '수정에 성공하였습니다.',
  EDIT_FAILURE: '수정에 실패하였습니다.',
  IS_NOT_VALID_LINE_NAME_LENGTH: `노선의 이름은 ${LINES.MIN_LINE_NAME_LENGTH}글자 이상, ${LINES.MAX_LINE_NAME_LENGTH}글자 이하만 입력 가능합니다.`,
  IS_NOT_VALID_DEPARTURE_AND_ARRIVAL: '상행선 역과 하행선 역이 같습니다.',
  IS_NOT_POSITIVE_NUMBER: '0보다 큰 값을 입력해주세요.',
};
