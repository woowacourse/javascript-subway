import { BASE_URL, PATH } from '../../src/js/constants/url';

describe('지하철 역 관리 테스트', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('지하철 역을 조회한다.', () => {
    cy.get('.js-link[href="/station"]').click();
    cy.intercept({ url: BASE_URL + PATH.STATIONS, method: 'GET' }).as(
      'getStations'
    );

    cy.wait('@getStations')
      .its('response.body')
      .its('length')
      .then((stationsLength) => {
        cy.get('.js-station-item').its('length').should('eq', stationsLength);
      });
  });

  it('지하철 역을 추가한다.', () => {
    cy.intercept({ url: BASE_URL + PATH.STATIONS, method: 'POST' }).as(
      'createStation'
    );

    cy.get('#station-name').type('글루밍에브리웰');
    cy.get('#create-station-form').submit();

    cy.wait('@createStation').then(
      cy
        .get('.js-station-item span')
        .last()
        .should('have.text', '글루밍에브리웰')
    );
  });

  it('지하철 역을 수정한다.', () => {
    cy.get('.js-station-item')
      .first()
      .its('data-id')
      .then((stationId) => {
        cy.intercept({ url: BASE_URL + PATH.STATIONS + stationId }).as(
          'editStation'
        );
      });

    cy.get('#station-name').type('글루밍에브리웰');
    cy.get('.js-station__edit').first().click();
    cy.get('#subway-station-name').type('구루미');
    cy.get('#edit-station-form').submit();

    cy.wait('@editStation').then(
      cy.get('.js-station-item span').first().should('have.text', '구루미')
    );
  });

  it('지하철 역을 삭제한다.', () => {
    cy.get('.js-station-item')
      .first()
      .its('data-id')
      .then((stationId) => {
        cy.intercept({ url: BASE_URL + PATH.STATIONS + stationId }).as(
          'deleteStation'
        );
      });

    cy.get('.js-station__delete').first().click();
    cy.wait('@deleteStation').then(
      cy.get('.js-station-item span').first().should('not.have.text', '구루미')
    );
  });
});
