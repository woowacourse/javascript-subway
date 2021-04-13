export function login() {
  cy.fixture('users/test.json').then(({ email, password }) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);

    cy.get('#login-form').submit();
  });
}
