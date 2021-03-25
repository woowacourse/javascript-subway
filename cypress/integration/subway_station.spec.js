describe('subway-station-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/');
    cy.get('.menu button').first().click();
    cy.get('#email').type('test99@test.com');
    cy.get('#password').type('test99');
    cy.get('.input-submit').click();
    cy.get('.menu button').first().click();
  });

  it('지하철명을 작성후 확인 버튼을 누르면, 아래 목록에 추가된다.', () => {
    cy.get('#station-add-input').type('신촌');
    cy.get('#station-add-button').click();
    cy.get('.station-list-item span').last().should('have.text', '신촌');
  });

  it("역의 '수정' 버튼을 누르면 모달창이 열린다", () => {
    cy.get('.modify-button').last().click();
    cy.get('.modal').should('have.class', 'open');
  });

  it('모달창에 빈칸에 새로운 역명을 작성후 확인 버튼을 누르면, 해당 역명이 변경된다.', () => {
    cy.get('#station-modify-input').type('홍대');
    cy.get('#station-modify-button').click();
    cy.get('.station-list-item span').last().should('have.text', '홍대');
  });

  it("역의 '삭제' 버튼을 누르면 confirm창 나오고 확인을 누르면 해당 역이 삭제된다.", () => {
    cy.window().then(window => cy.stub(window, 'confirm').as('confirm'));
    cy.get('.station-list-item').then(items => {
      const itemsLength = items.attr('length');
      cy.get('.delete-button').last().click();
      cy.get('@confirm').should(
        'be.calledWith',
        '정말로 역을 삭제하시겠습니까?',
      );
      cy.get('.station-list-item span').last().should('not.have.text', '홍대');
      cy.get('.station-list-item').should('have.length', itemsLength - 1);
    });
  });
});
