import { SNACKBAR_MESSAGE } from '../../src/js/constants/index.js';

describe('지하철 노선도 테스트', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('navigation 탭을 클릭했을 때, 해당 URL로 이동하는지 확인한다.', () => {
    ['stations', 'lines', 'sections', 'login'].forEach((name) => {
      cy.get(`#navigation-${name}-button`).click();
      cy.url().should('include', name);
    });
  });

  it('회원가입에서 비밀번호란과 비밀번호 확인란을 다르게 입력했을 때 snackbar가 출력되는지 확인한다.', () => {
    cy.get('#signup-button').click();

    cy.get('#signup-name').type('우테코');
    cy.get('#signup-email').type('wootecho@naver.com');
    cy.get('#signup-password').type('124');
    cy.get('#signup-password-confirm').type('123{enter}');
    cy.get('.snackbar').should(
      'have.text',
      SNACKBAR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD,
    );
  });

  it('정상적으로 로그인이 되는지 확인한다.', () => {
    cy.visit('http://localhost:5500/');
    cy.get('#navigation-login-button').click();

    cy.get('#login-email').type('yujo@a.a');
    cy.get('#login-password').type('asd{enter}');
    cy.get('.snackbar').should('have.text', SNACKBAR_MESSAGE.LOGIN_SUCCESS);
  });

  it('정상적으로 로그아웃이 되는지 확인한다.', () => {
    cy.get('#navigation-logout-button').click();
    cy.get('.snackbar').should('have.text', SNACKBAR_MESSAGE.LOGOUT_SUCCESS);
  });
});
