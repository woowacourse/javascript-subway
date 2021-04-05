import { SELECTOR } from '../../src/js/subway/constants';
import { NAME_LENGTH } from '../../src/js/subway/constants/constants';
import { isValidEmail, isValidName, isValidPassword } from '../../src/js/subway/utils';

describe('회원가입 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('email입력 시, 이메일 형식과 맞는지 여부를 검증한다.', () => {
    const invalidEmails = ['@gmail.com', 'loyd@', 'loyd@gmail..com', 'loyd@@gmail.com'];
    const validMail = 'loyd@gmail.com';
    invalidEmails.forEach(email => expect(isValidEmail(email)).to.equal(false));
    expect(isValidEmail(validMail)).to.equal(true);
  });

  it('name 입력 시, 한글, 영어, 숫자으로만 이루어져 있는지 검증한다.', () => {
    const invalidNames = ['     ', '로이드😀', '荒唐無稽', '!@#$%'];
    const validName = '로이드';
    invalidNames.forEach(name => expect(isValidName(name, NAME_LENGTH.USER_MIN, NAME_LENGTH.USER_MAX)).to.equal(false));
    expect(isValidName(validName, NAME_LENGTH.USER_MIN, NAME_LENGTH.USER_MAX)).to.equal(true);
  });

  it('password 입력 시, 최소 6자이상, 영숫자 및 특수문자의 조합으로 이루어져야 있는지 검증한다.', () => {
    const invalidPasswords = ['a', 'mooyaho123', 'mooyaho!', '123!!!', '    '];
    const validPassword = 'mooyaho123!';
    invalidPasswords.forEach(password => expect(isValidPassword(password)).to.equal(false));
    expect(isValidPassword(validPassword)).to.equal(true);
  });

  it('회원가입 시, 각 인풋에 대한 기준이 부합하지 않으면 에러 메시지를 렌더링한다.', () => {
    cy.get('[data-link="/signin"]').click();
    cy.get('[data-link="/signup"]').click();
    cy.get(`#${SELECTOR.USER_JOIN.MAIN.EMAIL_INPUT}`).type('@gmail.com');
    cy.get(`#${SELECTOR.USER_JOIN.MAIN.NAME_INPUT}`).type('     ');
    cy.get(`#${SELECTOR.USER_JOIN.MAIN.PASSWORD_INPUT}`).type('a');
    cy.get(`#${SELECTOR.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT}`).type('b');
    cy.get('.js-message-box').each(element => cy.wrap(element).should('be.visible'));
  });
});
