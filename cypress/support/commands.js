Cypress.Commands.add('login', () => {
  cy.get('.js-link[href="/login"]').click();
  cy.get('#email').type('test1212@test1212.com');
  cy.get('#password').type('121212');

  cy.get('button[name="submit"]').click();
});
