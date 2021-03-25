describe('지하철 노선도 역 관리 기능 테스트', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
    cy.get('#navigation-login-button').click();
    cy.get('#login-email').type('yujo@a.a');
    cy.get('#login-password').type('asd{enter}');
    cy.get('#navigation-stations-button').click();
  });

  const name = Date.now();

  it('지하철 노선이 정상적으로 등록되는지 확인한다.', () => {
    cy.get('#station-name-input').type(`${name}{enter}`);
    cy.get('.station-name').eq(-1).should('have.text', name);
  });

  it('중복된 지하철 역이 추가되지 않는지 확인한다.', () => {
    cy.get('.station-list-item')
      .its('length')
      .then((len) => {
        cy.get('#station-name-input').type(`${name}{enter}`);
        cy.get('.station-list-item').its('length').should('eq', len);
      });
  });

  it('등록된 지하철 역을 수정할 수 있는지 확인한다.', () => {
    const editName = Date.now();

    cy.get('.station-edit-button').eq(-1).click();
    cy.get('#station-edit-name-input').type(`${editName}{enter}`);
    cy.get('.station-name').eq(-1).should('have.text', editName);
  });

  it('등록된 지하철 역을 삭제할 수 있는지 확인한다.', () => {
    cy.get('.station-list-item')
      .its('length')
      .then((len) => {
        cy.get('.station-delete-button').eq(-1).click();
        cy.get('.confirm-button').click();
        cy.get('.station-list-item')
          .its('length')
          .should('eq', len - 1);
      });
  });
});
