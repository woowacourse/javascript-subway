import { STATION_AMOUNT } from './service';

export const AUTH = Object.freeze({
  INVALID_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.',
  SIGNUP_SUCCESS: '회원가입 성공! 자동으로 로그인합니다.',
});

export const STATION = Object.freeze({
  INVALID_STATION_NAME: '최소 2자, 최대 20자의 역 이름을 입력해주세요',
  ADD_STATION_FAILED: '역 등록에 실패했습니다.',
  GET_STATION_LIST_FAILED: '역 목록을 가져오지 못했습니다.',
  DUPLICATED_STATION_NAME: '이미 존재하는 역 이름입니다.',
  DELETE_STATION_FAILED: '역 삭제에 실패했습니다.',
  DELETE_STATION_SUCCESS: '역을 삭제했습니다.',
  DELETE_STATION_CONFIRM: '역을 삭제하시겠습니까?',
  EDIT_STATION_FAILED: '역 이름 수정에 실패했습니다',
});

export const LINE = Object.freeze({
  INVALID_LINE_NAME: '최소 2자, 최대 20자의 역 이름을 입력해주세요',
  GET_LINE_LIST_FAILED: '노선 목록을 가져오지 못했습니다.',
  ADD_LINE_FAILED: '노선 등록에 실패했습니다.',
  TOO_FEW_STATION: `노선을 만들기 위해서는 ${STATION_AMOUNT.MIN}개 이상의 역이 필요합니다.`,
  DELETE_LINE_FAILED: '노선 삭제에 실패했습니다.',
  DELETE_LINE_SUCCESS: '노선을 삭제했습니다.',
  DELETE_LINE_CONFIRM: '노선을 삭제하시겠습니까?',
  EDIT_LINE_FAILED: '노선 수정에 실패했습니다',
});

export const SECTION = Object.freeze({
  NO_AVAILABLE_STATION: '등록할 수 있는 역이 없습니다. 역을 추가해주세요.',
  ADD_SECTION_FAILED: '구간 추가에 실패했습니다.',
  EDIT_SECTION_FAILED: '구간 수정에 실패했습니다.',
  DELETE_SECTION_FAILED: '구간 삭제에 실패했습니다.',
  GET_SECTION_FAILED: '구간 조회에 실패했습니다.',
});

export const STORE = Object.freeze({
  DATA_LOAD_FAILED: '데이터를 불러오는데 실패했습니다.',
});
