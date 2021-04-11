const { ELEMENT, ERROR_MESSAGE, PATH } = require('../../src/js/utils/constants');

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('회원가입을 할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  // 회원가입 테스트는 최초 1번만 통과 가능
  it('회원가입 페이지에서 회원가입 성공 시, 로그인 화면으로 이동된다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`).type('muyahooooooo@naver.com');
    cy.get(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`).type('김상덕');
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`).type('qwerqwer');
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`).type('qwerqwer');
    cy.get(`.${ELEMENT.SIGN_UP_SUBMIT_BUTTON}`).click();
    cy.url().should('include', PATH.SIGNIN);
  });
});

describe('회원가입 페이지에서 잘못된 입력 시 에러 메시지를 출력한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('중복된 이메일로 입력 시, 에러 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`).type('1219ssm@naver.com');
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_CHECK_TEXT_AREA}`).should('have.text', ERROR_MESSAGE.DUPLICATED_EMAIL);
  });

  it('잘못된 이메일 형식 입력 시, 에러 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`).type('1219ssm@naver.c');
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_CHECK_TEXT_AREA}`).should('have.text', ERROR_MESSAGE.INVALID_EMAIL_FORMAT);
  });

  it('비밀번호와 비밀번호 확인을 다르게 입력 시, 에러 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`).type('029381294');
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA}`).should(
      'have.text',
      ERROR_MESSAGE.DIFFERENT_PASSWORD_AND_PASSWORD_CONFIRM,
    );
  });

  it('이름 입력란에 한글, 영어 외의 형식 입력 시, 에러 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`).type('1219ssm@naver.com');
    cy.get(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`).type('김상덕123');
    cy.get(`.${ELEMENT.SIGN_UP_USER_NAME_CHECK_TEXT_AREA}`).should('have.text', ERROR_MESSAGE.INVALID_NAME_TYPE);
  });

  it('8자 미만의 비밀번호 입력 시, 에러 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`).type('1219ssm@naver.com');
    cy.get(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`).type('김상덕');
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`).type('qwer');
    cy.get(`.${ELEMENT.SIGN_UP_PASSWORD_CHECK_TEXT_AREA}`).should(
      'have.text',
      ERROR_MESSAGE.NEED_OVER_PASSWORD_MIN_LENGTH,
    );
  });
});
