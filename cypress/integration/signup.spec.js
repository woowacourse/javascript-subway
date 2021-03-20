const { ERROR_MESSAGE, SIGN_UP } = require('../../src/js/utils/constants');

describe('회원가입을 할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  // 회원가입 테스트는 최초 1번만 통과 가능
  it('회원가입 페이지에서 회원가입 성공 시, 로그인 화면으로 이동된다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('muyahooooooo@naver.com');
    cy.get('.signup-form__user-name-input').type('김상덕');
    cy.get('.signup-form__password-input').type('qwerqwer');
    cy.get('.signup-form__password-confirm-input').type('qwerqwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signin');
  });
});

describe('회원가입 페이지에서 잘못된 입력으로 회원가입 시도 시 alert 메시지를 출력한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('중복된 이메일로 가입 시도 시, alert 메시지를 출력한다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('1219ssm@naver.com');
    cy.get('.signup-form__user-name-input').type('김상덕');
    cy.get('.signup-form__password-input').type('qwerqwer');
    cy.get('.signup-form__password-confirm-input').type('qwerqwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signup');

    cy.get('@alertStub').should('be.calledWith', SIGN_UP.ERROR_ALERT_MATCH[400]);
  });

  it('잘못된 이메일 형식으로 가입 시도 시, alert 메시지를 출력한다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('1219ssm@naver.c');
    cy.get('.signup-form__user-name-input').type('김상덕');
    cy.get('.signup-form__password-input').type('qwerqwer');
    cy.get('.signup-form__password-confirm-input').type('qwerqwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signup');

    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.INVALID_TYPE_EMAIL);
  });

  it('비밀번호와 비밀번호 확인을 다르게 입력 후 가입 시도 시, alert 메시지를 출력한다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('1219ssm@naver.com');
    cy.get('.signup-form__user-name-input').type('김상덕');
    cy.get('.signup-form__password-input').type('qwerqwerqwer');
    cy.get('.signup-form__password-confirm-input').type('qwerqwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signup');

    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.NOT_SAME_PASSWORD_AND_PASSWORD_CONFIRM);
  });

  it('이름 입력란에 한글, 영어 외의 형식 입력 후 가입 시도 시, alert 메시지를 출력한다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('1219ssm@naver.com');
    cy.get('.signup-form__user-name-input').type('김상덕123');
    cy.get('.signup-form__password-input').type('qwerqwer');
    cy.get('.signup-form__password-confirm-input').type('qwerqwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signup');

    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.INVALID_NAME);
  });

  it('8자 미만의 비밀번호 입력 후 가입 시도 시, alert 메시지를 출력한다.', () => {
    cy.get('.nav-bar__sign-in-button').click();
    cy.wait(100);
    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('.signup-form__email-input').type('1219ssm@naver.com');
    cy.get('.signup-form__user-name-input').type('김상덕');
    cy.get('.signup-form__password-input').type('qwer');
    cy.get('.signup-form__password-confirm-input').type('qwer');
    cy.get('.signup-form__input-submit-button').click();
    cy.wait(100);
    cy.url().should('include', '/signup');

    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH);
  });
});
