import { CONFIRM_MESSAGE } from '../../src/js/constants/message';
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
        cy.get('.js-line-item').its('length').should('eq', linesLength);
      });
  });

  it('지하철 노선을 추가한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('createLine');

    cy.get('#line-add-name').type('무야호선');
    cy.get('#line-add-color').type('orange-500');
    cy.get('#line-add-up-station').select('로이더');
    cy.get('#line-add-down-station').select('폭호');
    cy.get('#line-add-distance').type(10);
    cy.get('#line-add-duration').type(10);
    cy.get('.color-option').first().click();
    cy.get('#line-add-line-form').submit();

    cy.wait('@createLine').then(
      cy
        .get('.js-line-item subway-line-list-item-name')
        .first()
        .should('have.text', '무야호선')
    );
  });

  it('지하철 노선을 수정한다.', () => {
    cy.get('.js-line-item')
      .first()
      .its('data-id')
      .then((lineId) => {
        cy.intercept({ url: BASE_URL + PATH.LINES + lineId }).as('editLine');
      });

    cy.get('js-line-item__edit').first().click();
    cy.get('#line-edit-name').type('구루무야호선');
    cy.get('#line-edit-color').type('red-500');
    cy.get('.color-option').first().click();
    cy.get('#line-edit-line-form').submit();

    cy.wait('@editLine').then(
      cy
        .get('.subway-line-list-item-name')
        .first()
        .should('have.text', '구루무야호선')
    );
  });

  it('지하철 노선을 삭제한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('deleteLine');

    cy.get('.js-line-item__delete')
      .first()
      .click()
      .then(() => {
        confirm(CONFIRM_MESSAGE.DELETE);
      });

    cy.wait('@deleteLine').then(
      cy
        .get('.js-line-item subway-line-list-item-name')
        .first()
        .should('not.have.text', '구루무야호선')
    );
  });
});
