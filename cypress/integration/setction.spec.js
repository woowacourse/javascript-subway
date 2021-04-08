import { beforeLogin, afterLogin } from '../common/login.js';

describe('지하철 노선도 구간 관리 기능 테스트', () => {
  before(() => {
    beforeLogin();

    // 테스트에 사용할 역을 2개 추가한다.
    cy.get('#navigation-stations-button').click();
    cy.get('#station-name-input').type('상행역{enter}');
    cy.get('#station-name-input').clear();
    cy.get('#station-name-input').type('중간역{enter}');
    cy.get('#station-name-input').clear();
    cy.get('#station-name-input').type('하행역{enter}');
    cy.get('#station-name-input').clear();

    // 테스트에 사용할 노선을 등록한다.
    cy.get('#navigation-lines-button').click();
    cy.get('#line-create-button').click();
    cy.get('#line-name-input').type('테스트노선');
    cy.get('#departure-station-select').select('상행역');
    cy.get('#arrival-station-select').select('하행역');
    cy.get('#distance-input').type(100);
    cy.get('#duration-input').type(100);
    cy.get('.bg-red-600').click();
    cy.get('.input-submit').click({ force: true });

    cy.get('#navigation-sections-button').click();
    cy.get('#line-select').select('테스트노선');
  });

  after(() => {
    afterLogin();

    cy.get('#navigation-lines-button').click();
    cy.get('.line-delete-button').eq(0).click();
    cy.get('.confirm-button').click();

    cy.get('#navigation-stations-button').click();
    cy.get('.station-delete-button').eq(0).click();
    cy.wait(100);
    cy.get('.confirm-button').click();
    cy.get('.station-delete-button').eq(0).click();
    cy.get('.confirm-button').click();
    cy.wait(100);
    cy.get('.station-delete-button').eq(0).click();
    cy.get('.confirm-button').click();
  });

  it('새로운 구간을 추가할 수 있어야 한다.', () => {
    cy.get('.create-section-btn').click();

    cy.get('#modal-line-select').select('테스트노선');
    cy.get('#previous-station-select').select('중간역');
    cy.get('#next-station-select').select('하행역');
    cy.get('#distance-input').type(10);
    cy.get('#duration-input').type(10);
    cy.get('.input-submit').click();

    cy.wait(1000);
    cy.get('.section-list-item').its('length').should('eq', 3);
  });

  it('등록한 구간을 제거할 수 있어야 한다.', () => {
    cy.get('.section-list-item')
      .its('length')
      .then((len) => {
        cy.get('.section-delete-button').eq(-2).click({ force: true });
        cy.get('.confirm-button').click();
        cy.get('#section-list-container')
          .children()
          .should('have.length', len - 1);
      });
  });
});
