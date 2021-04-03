import { BASE_URL, PATH } from '../../src/js/constants/url';

describe('지하철 구간 관리 테스트', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('지하철 구간을 조회한다.', () => {
    cy.get('.js-link[href="/section"]').click();
    cy.intercept({ url: BASE_URL + PATH.LINES }).as('getSectionsOfLine');

    cy.wait('@getSectionsOfLine')
      .its('response.body.lines')
      .its('length')
      .then((sectionsLength) => {
        cy.get('.js-section-list').its('length').should('eq', sectionsLength);
      });
  });

  it('지하철 구간을 추가한다.', () => {
    cy.get('.js-section-form__select option')
      .eq(1)
      .its('value')
      .then((lineId) => {
        cy.intercept({
          url: BASE_URL + PATH.LINES + '/' + lineId + PATH.SECTIONS,
        }).as('createSection');
      });

    cy.get('.js-section-item__create').click();

    cy.get('#up-section').select('로이더');
    cy.get('#down-section').select('폭호');
    cy.get('#distance').type(1);
    cy.get('#duration').type(1);

    cy.get('#down-section').select('폭호');
    cy.wait('@createSection').then(() => {
      cy.get('.js-section-form__select option')
        .eq(1)
        .its('value')
        .then((lineId) => {
          cy.get('.js-section-form__select').select(lineId);
        });

      cy.get('.js-section-item span').last().should('have.text', '폭호');
    });
  });

  it('지하철 구간을 삭제한다.', () => {
    cy.get('.js-section-form__select option')
      .eq(1)
      .its('value')
      .then((lineId) => {
        cy.get('.js-section-form__select option')
          .eq(0)
          .its('value')
          .then((stationId) => {
            cy.intercept({
              url:
                BASE_URL +
                PATH.LINES +
                '/' +
                lineId +
                PATH.SECTIONS +
                '?stationId=' +
                stationId,
            }).as('deleteSection');
          });
      });

    cy.get('.js-section-item__delete').first().click();
    cy.wait('@deleteSection').then(
      cy.get('.js-section-item span').last().should('not.have.text', '폭호')
    );
  });
});
