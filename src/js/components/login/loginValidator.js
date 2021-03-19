import { isEmpty } from '../../utils/validation';

export const checkLoginValid = ({ email, password }) => {
  switch (true) {
    case isEmpty(email):
      return '이메일은 공백이 될 수 없습니다!';

    case isEmpty(password):
      return '비밀번호는 공백이 될 수 없습니다!';
  }
};
