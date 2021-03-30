describe('지하철 구간 관리 테스트', () => {
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
    cy.get('#sections-nav-button').click();
  });
});
