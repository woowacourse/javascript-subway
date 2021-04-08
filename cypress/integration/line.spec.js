import { beforeLogin, afterLogin } from '../common/login.js';

describe('지하철 노선도 노선 관리 기능 테스트', () => {
  before(() => {
    beforeLogin();

    // 테스트에 사용할 역을 2개 추가한다.
    cy.get('#navigation-stations-button').click();
    cy.get('#station-name-input').type('상행역{enter}');
    cy.get('#station-name-input').clear();
    cy.get('#station-name-input').type('하행역{enter}');

    cy.get('#navigation-lines-button').click();
  });

  after(() => {
    afterLogin();

    cy.get('#navigation-stations-button').click();
    cy.get('.station-delete-button').eq(0).click();
    cy.get('.confirm-button').click();
    cy.get('.station-delete-button').eq(0).click();
    cy.get('.confirm-button').click();
  });

  const lineName = '테스트 노선';

  it('새로운 노선이 정상적으로 등록되는지 확인한다.', () => {
    cy.get('#line-create-button').click();
    cy.get('#line-name-input').type(`${lineName}`);
    cy.get('#departure-station-select').select('상행역');
    cy.get('#arrival-station-select').select('하행역');
    cy.get('#distance-input').type(10);
    cy.get('#duration-input').type(10);
    cy.get('.bg-red-600').click();
    cy.get('.input-submit').click({ force: true });
    cy.get('.modal').should('not.be.visible');

    cy.get('.line-name').eq(0).should('have.text', lineName);
    cy.get('.subway-line-color-dot').eq(0).should('have.css', 'background-color', 'rgb(220, 38, 38)');
  });

  it('등록한 노선을 수정할 수 있는지 확인한다.', () => {
    cy.get('.line-edit-button').eq(0).click();
    cy.get('#line-name-input').clear();
    cy.get('#line-name-input').type('테스트 노선 수정');
    cy.get('.bg-blue-600').click();
    cy.get('.input-submit').click({ force: true });
    cy.get('.modal').should('not.be.visible');

    cy.get('.line-name').eq(0).should('have.text', '테스트 노선 수정');
    cy.get('.subway-line-color-dot').eq(0).should('have.css', 'background-color', 'rgb(37, 99, 235)');
  });

  it('등록된 노선을 삭제할 수 있는지 확인한다.', () => {
    cy.get('.line-list-item')
      .its('length')
      .then((len) => {
        cy.get('.line-delete-button').eq(0).click();
        cy.get('.confirm-button').click();
        cy.get('#lines-list-container')
          .children()
          .should('have.length', len - 1);
      });
  });
});
