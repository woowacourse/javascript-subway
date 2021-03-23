describe('지하철 역 관리 테스트', () => {
  const requestURL = 'https://www.boorownie.com';
  const userEmail = 'sunny@email.com';
  const password = 'sunny';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.intercept('POST', `${requestURL}/login/token`).as('login');

    cy.get('#login-nav-button').click();

    cy.get('#email').type(userEmail);
    cy.get('#password').type(password);

    cy.get('#login-submit').click();
    cy.wait('@login');

    cy.get('#stations-nav-button').click();
  });

  // Cypress에서 input invalid 관련 항목 검사 불가능

  it('기존 지하철 목록에 존재하는 경우 추가하지 않고 경고 메시지를 표시한다.', () => {
    cy.get('.station-item-name')
      .first()
      .invoke('text')
      .then((name) => {
        cy.get('#station-name').type(name);
        cy.get('#station-name-submit').click();

        cy.get('#station-duplicated-warning')
          .should('be.visible')
          .and('have.text', '지하철 역이 이미 존재합니다.');
      });
  });
});
