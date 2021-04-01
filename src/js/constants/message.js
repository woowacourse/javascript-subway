import { LENGTH } from './standard';

const VALID_MESSAGE = {
  NAME: '사용 가능한 이름입니다.',
  EMAIL: '사용 가능한 이메일입니다.',
  PASSWORD: '비밀번호가 일치합니다.',
};

const INVALID_MESSAGE = {
  SIGNUP: {
    NAME: {
      FORMAT: '공백, 특수문자, 숫자는 입력하실 수 없습니다.',
      LENGTH: `이름의 길이는 ${LENGTH.NAME.MIN} 이상 ${LENGTH.NAME.MAX} 이하여야 합니다.`,
    },

    EMAIL: {
      FORMAT: '올바른 이메일 형식이 아닙니다.🥺',
      DUPLICATED: '이미 존재하는 이메일입니다.🥺',
    },

    PASSWORD: {
      LENGTH: `비밀번호는 ${LENGTH.PASSWORD.MIN} 이상 ${LENGTH.PASSWORD.MAX} 이하여야 합니다.🥺`,
      MATCHED: '비밀번호가 일치하지 않습니다.🥺',
    },
  },

  LOGIN: {
    FAILED: '아이디 또는 비밀번호가 일치하지 않습니다.',
  },
};

const ERROR_MESSAGE = {
  INVALID_TOKEN: '토큰이 유효하지 않습니다.',
};

const CONFIRM_MESSAGE = {
  DELETE: '삭제하시겠습니까?',
};

export { VALID_MESSAGE, INVALID_MESSAGE, ERROR_MESSAGE, CONFIRM_MESSAGE };
