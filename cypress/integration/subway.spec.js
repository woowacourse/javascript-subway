import { isValidEmail, isValidName, isValidPassword } from '../../src/js/subway/utils';

describe('Subway test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('email은 이메일 형식을 허용한다.', () => {
    const invalidEmails = ['@gmail.com', 'loyd@', 'loyd@gmail..com', 'loyd@@gmail.com'];
    const validMail = 'loyd@gmail.com';

    invalidEmails.forEach(email => expect(isValidEmail(email)).to.equal(false));
    expect(isValidEmail(validMail)).to.equal(true);
  });

  it('name은 한글, 영어, 숫자만 허용한다.', () => {
    const invalidNames = ['     ', '로이드😀', '荒唐無稽', '!@#$%'];
    const validName = '로이드';

    invalidNames.forEach(name => expect(isValidName(name)).to.equal(false));
    expect(isValidName(validName)).to.equal(true);
  });

  it('password는 최소 6자이상, 영숫자 및 특수문자의 조합으로 이루어져야 한다.', () => {
    const invalidPasswords = ['a', 'mooyaho123', 'mooyaho!', '123!!!', '    '];
    const validPassword = 'mooyaho123!';

    invalidPasswords.forEach(password => expect(isValidPassword(password)).to.equal(false));
    expect(isValidPassword(validPassword)).to.equal(true);
  });

  it('회원가입 시, 각 인풋에 대한 기준이 부합하지 않으면 에러 메시지를 렌더링한다.', () => {
    cy.get('[data-link="/signin"]').click();
    cy.get('[data-link="/signup"]').click();
    cy.get('#signup-email').type('@gmail.com');
    cy.get('#signup-name').type('     ');
    cy.get('#signup-password').type('a');
    cy.get('#signup-password-confirm').type('b');
    cy.get('.js-message-box').each(element => cy.wrap(element).should('be.visible'));
  });
});
