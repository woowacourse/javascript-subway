export function addLine({ name, upStation, downStation, duration, distance, color }) {
  cy.get('#create-line-button').click();

  cy.get('#line-add-form #subway-line-name').type(name);
  cy.get('#line-add-form #up-station').select(upStation);
  cy.get('#line-add-form #down-station').select(downStation);

  cy.get('#duration').type(duration);
  cy.get('#distance').type(distance);
  cy.get(`#line-add-form .js-subway-line-color-selector .${color}`).click();
  cy.get('#line-add-form .js-input-submit').click({ force: true });
}

export function editLine({ targetName, name, color }) {
  cy.get(`[data-name="${targetName}"] .js-line-edit-button`).click({ force: true });
  cy.get('#line-edit-form #subway-line-name').clear().type(name);
  cy.get(`#line-edit-form .${color}`).click();
  cy.get('#line-edit-form .js-input-submit').click({ force: true });
}

export function deleteLine(name) {
  cy.get(`[data-name="${name}"] .js-line-delete-button`).click({ force: true });
}
