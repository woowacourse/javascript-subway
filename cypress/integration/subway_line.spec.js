describe('subway-line-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/');
    cy.get('.menu button').first().click();
    cy.get('#email').type('test99@test.com');
    cy.get('#password').type('test99');
    cy.get('.input-submit').click();
    cy.wait(2000);
    cy.get('.menu button').eq(0).click();

    cy.get('#station-add-input').type('신도림');
    cy.get('#station-add-button').click();
    cy.wait(500);
    cy.get('.delete-button').each(btn => {
      cy.wrap(btn).click();
    });
    cy.get('.menu button').first().click();
    cy.get('#station-add-input').type('신도림');

    cy.get('#station-add-button').click();
    cy.wait(500);
    cy.get('#station-add-input').type('동대문');
    cy.get('#station-add-button').click();
    cy.wait(500);
    cy.get('#station-add-input').type('잠실');
    cy.get('#station-add-button').click();
  });

  it('노선 관리 버튼을 누르면 노선 관리 페이지로 이동한다.', () => {
    cy.get('.menu button').eq(1).click();
    cy.url().should('eq', 'http://127.0.0.1:5500/lines');
  });
  it('노선 추가 버튼을 누르면 모달창이 열린다.', () => {
    cy.get('.create-line-btn').last().click();
    cy.get('.modal').should('have.class', 'open');
  });

  it('노선 이름, 상행역, 하행역, 상행역 거리, 상행 하행역 시간, 색상 선택을 하고 확인 버튼을 누르면, 노선 관리 목록에 색상과 노선 이름이 보여진다.', () => {
    cy.get('#subway-line-name').type('1호선');
    cy.get('#up-station').select('신도림');
    cy.get('#down-station').select('잠실');
    cy.get('#distance').type(1000);
    cy.get('#duration').type(1000);
    cy.get('.color-option.bg-orange-700').click();
    cy.get('.input-submit').click({ force: true });

    cy.get('.line-item-info span').eq(0).should('have.class', 'bg-orange-700');
    cy.get('.line-item-info span').eq(1).should('have.text', '1호선');
  });

  it('생성된 노선의 수정버튼을 눌러, 이름과 색깔을 변경하고 확인버튼을 누르면 변경된 노선 색상과 이름이 목록에 보여진다.', () => {
    cy.get('.modify-button').click();
    cy.get('#subway-line-name').type('2호선');
    cy.get('.color-option.bg-blue-800').click();
    cy.get('.input-submit').click({ force: true });

    cy.get('.line-item-info span').eq(0).should('have.class', 'bg-blue-800');
    cy.get('.line-item-info span').eq(1).should('have.text', '2호선');
  });

  it('노선의 삭제버튼을 누르면 해당 노선이 삭제된다.', () => {
    cy.get('.delete-button').click();
    cy.get('.station-list').should('not.exist');
  });
});
