describe('subway-section-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/');
    cy.get('.menu button').first().click();
    cy.get('#email').type('test99@test.com');
    cy.get('#password').type('test99');
    cy.get('.input-submit').click();
    cy.wait(500);
    cy.get('.menu button').eq(1).click();
    cy.get('.delete-button').each(btn => {
      cy.wrap(btn).click();
    });
    cy.wait(500);
    cy.get('.menu button').eq(0).click();
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

    cy.get('.menu button').eq(1).click();

    cy.get('.create-line-btn').last().click();
    cy.wait(500);
    cy.get('#subway-line-name').type('1호선');
    cy.get('#up-station').select('신도림');
    cy.get('#down-station').select('잠실');
    cy.get('#distance').type(1000);
    cy.get('#duration').type(1000);
    cy.get('.color-option.bg-orange-700').click();
    cy.get('.input-submit').click({ force: true });
  });

  it('구간 관리 버튼을 누르면 구간 관리 페이지로 이동한다', () => {
    cy.get('.menu button').eq(2).click();
    cy.url().should('eq', 'http://127.0.0.1:5500/sections');
  });

  it('관리할 호선 선택목록에서 호선을 선택하면, 해당 호선의 상행역, 하행역이 보여진다.', () => {
    cy.get("form[name='select-section'] select").select('1호선');
    cy.get('#section-list li span').eq(0).should('have.text', '신도림');
    cy.get('#section-list li span').eq(1).should('have.text', '잠실');
  });

  it('구간 추가 버튼을 누르면 구간 추가 모달창이 열린다', () => {
    cy.get('.create-section-btn').click();
    cy.get('.modal').should('have.class', 'open');
  });

  it('노선, 추가할 구간, 다음역, 두 역간의 거리, 두역간의 시간을 입력후 확인 버튼을 누르면, 선택한 위치에 해당역이 추가된다.', () => {
    cy.get('select[name="line-select"]').select('1호선');
    cy.get('select[name="prev-station"]').select('출발역으로 추가');
    cy.get('select[name="next-station"]').select('동대문');
    cy.get('#distance').type(500);
    cy.get('#duration').type(500);
    cy.get('.input-submit').click({ force: true });
    cy.get('#section-list li span').eq(0).should('have.text', '동대문');
    cy.get('#section-list li span').eq(1).should('have.text', '신도림');
    cy.get('#section-list li span').eq(2).should('have.text', '잠실');
  });

  it('구간에 있는 역을 삭제하면 해당 역이 구간에서 삭제된다', () => {
    cy.get('.delete-button').eq(0).click();
    cy.get('#section-list li span').eq(0).should('have.text', '신도림');
    cy.get('#section-list li span').eq(1).should('have.text', '잠실');
  });
});
