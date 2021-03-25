import { BASE_URL, PATH } from '../../src/js/constants/url';

describe('지하철 노선 관리 테스트', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('지하철 노선을 조회한다.', () => {
    cy.get('.js-link[href="/line"]').click();
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('getLines');

    cy.wait('@getLines')
      .its('response.body')
      .its('length')
      .then((linesLength) => {
        cy.get('.js-line').its('length').should('eq', linesLength);
      });
  });

  it('지하철 노선을 추가한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('createLine');

    cy.get('#line-name').type('무야호선');
    cy.get('#subway-line-color').type('orange-500');
    cy.get('#up-station').select('로이더');
    cy.get('#down-station').select('폭호');
    cy.get('#distance').type(10);
    cy.get('#duration').type(10);
    cy.get('#create-or-edit-line-form [name="submit"]').click();

    cy.wait('@createLine').then(
      cy.get('.js-line span').first().should('have.text', '무야호선')
    );
  });

  it('지하철 노선을 수정한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('editLine');

    cy.get('#line-name').type('구루무야호선');
    cy.get('#subway-line-color').type('red-500');
    cy.get('#up-station').select('로이더');
    cy.get('#down-station').select('폭호');
    cy.get('#distance').type(10);
    cy.get('#duration').type(10);
    cy.get('#create-or-edit-line-form [name="submit"]').click();

    cy.wait('@editLine').then(
      cy.get('.js-line span').first().should('have.text', '구루무야호선')
    );
  });

  it('지하철 노선을 삭제한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('deleteLine');

    cy.get('.js-line__delete').first().click();
    cy.wait('@deleteLine').then(
      cy.get('.js-line span').first().should('not.have.text', '구루무야호선')
    );
  });
});
