import { STATION_NAME_MIN_LENGTH, STATION_NAME_MAX_LENGTH } from "./general.js";

export const ERROR_MESSAGE = {
  SIGNUP_FAILURE: "회원가입에 실패했습니다. 다시 시도해주세요.",
  LOGIN_FAILURE: "이메일 혹은 비밀번호가 유효하지 않습니다.",
  PASSWORD_CONFIRM_FAILURE: "비밀번호가 일치하지 않습니다.",
  API_CALL_FAILURE:
    "시스템 오류 또는 네트워크 장애로 인해 요청하신 동작을 수행할 수 없습니다.\n 문의: sunccol@woowahan.com",
  INVALID_EMAIL: "사용할 수 없는 이메일입니다. 이메일을 다시 입력해주세요.",
  EMPTY_NAME: "이름을 입력해주세요.",
  INVALID_PASSWORD:
    "유효하지 않은 비밀번호 입니다. 6자리 이상의 비밀번호를 입력해주세요.",
  INVALID_EMAIL_FORM: "올바르지 않은 이메일 형식입니다.",
  DUPLICATED_EMAIL: "이미 존재하는 이메일입니다.",
  DUPLICATED_STATION: "이미 존재하는 지하철역입니다.",
  DUPLICATED_LINE: "이미 존재하는 노선입니다.",
  STATION_NAME_LENGTH: `${STATION_NAME_MIN_LENGTH}자 이상 ${STATION_NAME_MAX_LENGTH}자 이하의 역 이름을 입력해주세요.`,
  DELETE_STATION: "Fail to delete station",
  DELETE_LINE: "Fail to delete line",
  TYPE_REQUIRED_STRING: "String is required",
  UNKNOWN_API_STATUS: "Unknown API status",
};

export const SUCCESS_MESSAGE = {
  PASSWORD_CONFIRM_SUCCESS: "비밀번호 확인 완료!",
  SIGNUP_SUCCESS: "회원가입에 성공하였습니다!",
  LOGIN_SUCCESS: "로그인에 성공하였습니다!",
  LOGOUT_SUCCESS: "로그아웃을 하였습니다.",
  VALID_EMAIL: "사용가능한 이메일입니다.",
  ADD_STATION: "지하철역을 추가했습니다",
  MODIFY_STATION: "지하철역 이름을 수정했습니다.",
  DELETE_STATION: "지하철역을 삭제했습니다.",
  DELETE_LINE: "지하철 노선을 삭제했습니다.",
};

export const CONFIRM_MESSAGE = {
  DELETE_STATION: "정말 해당 역을 삭제하시겠습니까?",
  DELETE_LINE: "정말 해당 노선을 삭제하시겠습니까?",
};
