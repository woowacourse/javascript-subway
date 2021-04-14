export const beforeLogin = () => {
  cy.visit('http://localhost:8080/');
  cy.get('#navigation-login-button').click();
  cy.get('#login-email').type('test@email.com');
  cy.get('#login-password').type('123{enter}');
};

export const afterLogin = () => {
  cy.get('#navigation-logout-button').click();
  cy.get('#navigation-login-button').click();
  cy.get('#login-email').type('test@email.com');
  cy.get('#login-password').type('123{enter}');
};
