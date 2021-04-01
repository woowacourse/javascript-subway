import { TEST_EMAIL, TEST_PW, END_POINT } from "../constants/general.js";

Cypress.Commands.add("login", () => {
  sessionStorage.clear();

  cy.get("#email").type(TEST_EMAIL);
  cy.get("#password").type(TEST_PW).type("{enter}");
});

Cypress.Commands.add("addLine", (line) => {
  cy.get(".js-modal input[name='subway-line-name']").clear().type(line.name);
  cy.get(".js-modal #up-station").select(line.upStation);
  cy.get(".js-modal #down-station").select(line.downStation);
  cy.get(".js-modal #distance").clear().type(line.distance);
  cy.get(".js-modal #duration").clear().type(line.duration);
  cy.get(`.js-modal .${line.color}`).click();
  cy.get(".js-modal button[type='submit']").click();
});
