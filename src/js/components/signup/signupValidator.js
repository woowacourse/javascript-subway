import { isEmpty, isDifferent } from '../../utils/validation';

export const checkSignupValid = ({
  name,
  email,
  password,
  ['password-confirm']: passwordConfirm,
}) => {
  switch (true) {
    case isEmpty(name):
      return '이름은 공백이 될 수 없습니다!';

    case isEmpty(email):
      return '이메일은 공백이 될 수 없습니다!';

    case isEmpty(password):
      return '비밀번호는 공백이 될 수 없습니다!';

    case isEmpty(passwordConfirm):
      return '비밀번호 확인은 공백이 될 수 없습니다!';

    case isDifferent(password, passwordConfirm):
      return '패스워드가 일치하지 않습니다!';

    default:
      return '';
  }
};
