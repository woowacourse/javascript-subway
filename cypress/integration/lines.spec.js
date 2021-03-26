describe('지하철 노선 관리 테스트', () => {
  const requestURL = 'https://www.boorownie.com';
  const userEmail = 'sunny@email.com';
  const password = 'sunny';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.intercept('POST', `${requestURL}/login/token`).as('login');
    cy.intercept('GET', `${requestURL}/members/me`).as('userInfo');

    cy.get('#login-nav-button').click();

    cy.get('#email').type(userEmail);
    cy.get('#password').type(password);

    cy.get('#login-submit').click();
    cy.wait('@login');
    cy.wait('@userInfo');

    cy.get('#lines-nav-button').click();
  });

  it('새로운 지하철 노선을 등록할 수 있다.', () => {
    const newLineName = '우아한테크코스선2';

    cy.intercept('POST', `${requestURL}/lines`).as('createLine');

    cy.get('.create-line-btn').click();
    cy.get('.modal').should('be.visible');

    cy.get('#subway-line-name').type(newLineName);
    cy.get('#up-station').select('지그');
    cy.get('#down-station').select('서니');
    cy.get('#distance').type('10');
    cy.get('#duration').type('5');

    cy.get('.bg-orange-500').click();

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
});
