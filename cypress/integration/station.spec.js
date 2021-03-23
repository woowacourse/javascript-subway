describe('지하철 노선도 역 관리 기능 테스트', () => {
    before(() => {
      cy.visit('http://localhost:5500/');
      cy.get('#navigation-login-button').click();
      cy.get('#login-email').type('yujo@a.a');
      cy.get('#login-password').type('asd{enter}');
      cy.get('#navigation-lines-button').click();
    });
  
    it('지하철 노선이 정상적으로 등록되는지 확인한다.', () => {
      cy.get('#station-name').type('테스트역{enter}');
      cy.get('.station-list-item > span').eq(0).should('have.text', '테스트역');
    });
  
    it('중복된 지하철 역이 추가되지 않는지 확인한다.', () => {
      const stationListCount = cy.get('.station-list-item').its('length');
      cy.get('#station-name').type('테스트역{enter}');
      cy.get('.station-list-item').its('length').should('eq', stationListCount);
    });
  
    it('등록된 지하철 역을 수정할 수 있는지 확인한다.', () => {
      cy.get('.station-list-item > .station-edit-button').eq(0).click();
      cy.get('#station-edit-name').type('수정된테스트역{enter}');
      cy.get('.station-list-item > span')
        .eq(0)
        .should('have.text', '수정된테스트역');
    });
  
    it('등록된 지하철 역을 삭제할 수 있는지 확인한다.', () => {
      const stationListCount = cy.get('.station-list-item').its('length');
      cy.get('.station-delete-button').click();
      cy.get('#confirm-modal').should('be.visible');
      cy.get('#confirm-button').click();
      cy.get('.station-list-item')
        .its('length')
        .should('eq', stationListCount - 1);
    });
  });
  