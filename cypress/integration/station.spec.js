describe('지하철 노선도 역 관리 기능 테스트', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
    cy.get('#navigation-login-button').click();
    cy.get('#login-email').type('test@email.com');
    cy.get('#login-password').type('123{enter}');
    cy.get('#navigation-stations-button').click();
  });

  const stationName = '테스트역';

  it('지하철 역이 정상적으로 등록되는지 확인한다.', () => {
    cy.get('#station-name-input').type(`${stationName}{enter}`);
    cy.get('.station-name').eq(0).should('have.text', stationName);
  });

  it('중복된 지하철 역이 추가되지 않는지 확인한다.', () => {
    cy.get('.station-list-item')
      .its('length')
      .then((len) => {
        cy.get('#station-name-input').type(`${stationName}{enter}`);
        cy.get('.station-list-item').its('length').should('eq', len);
      });
  });

  it('등록된 지하철 역을 수정할 수 있는지 확인한다.', () => {
    const editStationName = '테스터역-수정';

    cy.get('.station-edit-button').eq(0).click();
    cy.get('#station-edit-name-input').type(`${editStationName}{enter}`);
    cy.get('.station-name').eq(0).should('have.text', editStationName);
  });

  it('등록된 지하철 역을 삭제할 수 있는지 확인한다.', () => {
    cy.get('.station-list-item')
      .its('length')
      .then((len) => {
        cy.get('.station-delete-button').eq(0).click();
        cy.get('.confirm-button').click();
        cy.get('.station-list-item')
          .its('length')
          .should('eq', len - 1);
      });
  });
});
