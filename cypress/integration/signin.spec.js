const { ELEMENT, ERROR_MESSAGE } = require('../../src/js/utils/constants');

describe('로그인을 할 수 있다.', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
  });

  it('로그인을 하지 않은 상태에서는 메뉴 버튼 중 로그인 버튼만 존재한다.', () => {
    cy.get('.nav-bar')
      .children()
      .children()
      .each(($el, i) => {
        $el[0].classList.contains(`${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`)
          ? cy.wrap($el).should('be.visible')
          : cy.wrap($el).should('not.be.visible');
      });
  });

  it('로그인 페이지에서 로그인 성공 시, 메인 화면으로 이동된다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`).type('abcd@naver.com');
    cy.get(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`).type('12341234');
    cy.get(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`).click();
    cy.url().should('eq', 'http://localhost:8080/');
  });

  it('로그인 페이지에서 로그인 성공 시, 로그인 버튼이 로그아웃으로 변경된다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).contains('로그아웃');
  });

  it('로그인 된 상태에서 로그아웃을 하면 메인 페이지로 이동한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).contains('로그인');
    cy.url().should('eq', 'http://localhost:8080/');
  });
});

describe('로그인 페이지에서 잘못된 입력으로 로그인 시도 시 alert 메시지를 출력한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('존재하지 않는 이메일을 입력 후 로그인 시도 시, alert 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`).type('asdlkzxjcpqwkej@naver.com');
    cy.get(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`).type('12341234');
    cy.get(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`).click();
    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.SIGN_IN_FAIL);
  });

  it('일치하지 않는 비밀번호를 입력 후 로그인 시도 시, alert 메시지를 출력한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`).type('abcd@naver.com');
    cy.get(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`).type('123123123');
    cy.get(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`).click();
    cy.get('@alertStub').should('be.calledWith', ERROR_MESSAGE.SIGN_IN_FAIL);
  });
});
