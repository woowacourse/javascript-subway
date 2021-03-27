import { requestCheckEmail } from '../../../services/auth';
import debounce from '../../../utils/debounce';
import { $ } from '../../../utils/dom';
import handleValidateSignupForm from './handleValidateSignupForm';

const checkEmail = async event => {
  const $emailCheckMessage = $('#email-check-message');
  const email = event.target.value;

  const isValidEmail = /[\w\S]+@[\w\S]+/.test(email);
  if (!isValidEmail) return;

  const isOk = await requestCheckEmail(email);

  $emailCheckMessage.textContent = isOk ? '✔️' : '❌';

  handleValidateSignupForm(event);
};

const handleCheckEmail = event => debounce(() => checkEmail(event), 500);

export default handleCheckEmail;
