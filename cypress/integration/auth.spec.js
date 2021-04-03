import { BASE_URL, PATH } from '../../src/js/constants/url';

describe('지하철 노선도 로그인, 로그아웃 기능 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  it('이메일과 비밀번호를 입력하여 로그인한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.MEMBERS.LOGIN }).as('login');
    cy.get('.js-link[href="/login"]').click();

    cy.get('#email').type('test1212@test1212.com');
    cy.get('#password').type('121212');

    cy.get('button[name="submit"]').click();
    cy.wait('@login').its('response.body.accessToken').should('exist');

    cy.url().should('eq', Cypress.config().baseUrl + '/station');
  });

  it('로그인을 하게되면, 로그인 버튼이 로그아웃으로 바뀐다.', () => {
    cy.get('.js-link[href="/logout"]').should('be.visible');
  });

  it('로그아웃 버튼을 클릭하면, 로그아웃 된다.', () => {
    cy.get('.js-link[href="/logout"]').click();
    cy.get('.js-link[href="/login"]').should('be.visible');
  });
});
