export function addStation(name) {
  cy.get('#station-name').clear();
  cy.get('#station-name').type(name);
  cy.get('#station-form').submit();
}

export function editStation(targetName, newName) {
  cy.get(`[data-name="${targetName}"] .js-station-edit-button`).click();
  cy.get('#station-name-edit-form #station-edit-name').clear();
  cy.get('#station-name-edit-form #station-edit-name').type(newName);
  cy.get('#station-name-edit-form').submit();
}

export function deleteStation(targetName) {
  cy.get(`[data-name="${targetName}"] .js-station-delete-button`).click();
}
