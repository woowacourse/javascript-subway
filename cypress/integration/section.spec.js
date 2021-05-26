import { BASE_URL, PATH } from '../../src/js/constants/url';

describe('지하철 구간 관리 테스트', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('지하철 구간을 조회한다.', () => {
    cy.get('.js-link[href="/section"]').click();
    cy.intercept({ url: BASE_URL + PATH.LINES + '/20' }).as(
      'getSectionsOfLine'
    );

    cy.wait('@getSectionsOfLine')
      .its('response.body.stations')
      .its('length')
      .then((sectionsLength) => {
        cy.get('.js-section').its('length').should('eq', sectionsLength);
      });
  });

  it('지하철 구간을 추가한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.LINES + '/20' + PATH.SECTIONS }).as(
      'createSection'
    );

    cy.get('#up-section').select('로이더');
    cy.get('#down-section').select('폭호');
    cy.get('#distance').type(10);
    cy.get('#duration').type(10);

    cy.wait('@createSection').then(
      cy.get('.js-section span').last().should('have.text', '폭호')
    );
  });

  it('지하철 구간을 삭제한다.', () => {
    cy.intercept({
      url: BASE_URL + PATH.LINES + '/20' + PATH.SECTIONS + '?stationId=2',
    }).as('deleteSection');

    cy.get('.js-station__delete').first().click();
    cy.wait('@deleteSection').then(
      cy.get('.js-station span').last().should('not.have.text', '폭호')
    );
  });
});
