Cypress.Commands.add("login", () => {
  sessionStorage.clear();

  cy.get("#email").type("sunccol@test.com");
  cy.get("#password").type("1q2w3e4r").type("{enter}");
});

Cypress.Commands.add("addLine", (line) => {
  cy.get("[name='subway-line-name']").clear().type(line.name);
  cy.get("#up-station").select(line.upStation);
  cy.get("#down-station").select(line.downStation);
  cy.get("#distance").clear().type(line.distance);
  cy.get("#duration").clear().type(line.duration);
  cy.get(`.${line.color}`).click();
  cy.type("{enter}");
});
