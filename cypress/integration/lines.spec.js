describe('지하철 노선 관리 테스트', () => {
  const requestURL = 'https://www.boorownie.com';
  const userEmail = 'sunny@email.com';
  const password = 'sunny';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.intercept('POST', `${requestURL}/login/token`).as('login');
    cy.intercept('GET', `${requestURL}/members/me`).as('userInfo');
    cy.intercept('GET', `${requestURL}/stations`).as('getStations');
    cy.intercept('GET', `${requestURL}/lines`).as('getLines');

    cy.get('#login-nav-button').click();

    cy.get('#email').type(userEmail);
    cy.get('#password').type(password);

    cy.get('#login-submit').click();
    cy.wait('@login');
    cy.wait('@userInfo');

    cy.wait('@getStations');
    cy.wait('@getLines');
    cy.get('#lines-nav-button').click();
  });

  it('새로운 지하철 노선을 등록할 수 있다.', () => {
    const newLineName = '우아한테크코스선3';

    cy.intercept('POST', `${requestURL}/lines`).as('createLine');

    cy.get('.create-line-btn').click();
    cy.get('.modal').should('be.visible');

    cy.get('#subway-line-name').type(newLineName);
    cy.get('#up-station').select('지그');
    cy.get('#down-station').select('서니');
    cy.get('#distance').type('10');
    cy.get('#duration').type('5');

    cy.get('.subway-line-color-selector > .bg-orange-500').click();

    cy.get('#modal-create-line').click();
    cy.wait('@createLine');

    cy.get('.modal').should('not.be.visible');
    cy.get('.line-list-item').first().find('.subway-line-list-item-name').should('have.text', newLineName);
  });

  it('기존 지하철 노선 목록에 존재하는 경우, 추가하지 않고 경고 메시지를 표시한다.', () => {
    const newLineName = '분당선';

    cy.get('.create-line-btn').click();
    cy.get('.modal').should('be.visible');

    cy.get('#subway-line-name').type(newLineName).blur();
    cy.get('#line-duplicated-warning').should('be.visible').and('have.text', '노선이 이미 존재합니다.');
  });

  it('지하철 노선 정보의 이름과 색상을 수정할 수 있다.', () => {
    const newLineName = '우아한테크코스선55';
    cy.intercept('PUT', `${requestURL}/lines`).as('editLine');

    cy.get('.line-list-item')
      .first()
      .then((item) => {
        cy.wrap(item)
          .find('[data-action="edit"]')
          .click()
          .then(() => {
            cy.get('.modal').should('be.visible');
            cy.get('#subway-line-name').clear().type(newLineName);
            cy.get('.subway-line-color-selector > .bg-indigo-500').click();
            cy.get('#modal-create-line').click();
            cy.wait('@editLine');
            cy.get('.modal').should('not.be.visible');
          });
      });

    cy.get('.line-list-item').first().find('.subway-line-list-item-name').should('have.text', newLineName);
    cy.get('.line-list-item').first().find('.subway-line-color-dot').should('have.class', 'bg-indigo-500');
  });

  it('지하철 노선을 삭제할 수 있다.', () => {
    const confirmStub = cy.stub();
    const targetLineName = '우아한테크코스선55';

    cy.intercept('DELETE', `${requestURL}/lines`).as('deleteLine');
    cy.on('window:confirm', confirmStub);

    cy.get('.line-list-item')
      .first()
      .then((item) => {
        cy.wrap(item)
          .find('[data-action="delete"]')
          .click()
          .then(() => {
            expect(confirmStub.getCall(0)).to.be.calledWith(`${targetLineName}을 삭제하시겠습니까?`);
          });
      });

    cy.wait('@deleteLine');
    cy.get('.subway-line-list-item-name').contains(targetLineName).should('not.exist');
    cy.get('.snackbar').should('have.text', `${targetLineName}이 삭제되었습니다.`);
  });
});
