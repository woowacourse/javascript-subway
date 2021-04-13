export function addSection({ upStation, downStation, distance, duration }) {
  if (upStation) {
    cy.get('#section-add-form #up-station').select(upStation);
  }

  if (downStation) {
    cy.get('#section-add-form #down-station').select(downStation);
  }

  cy.get('#section-add-form #distance').type(distance);
  cy.get('#section-add-form #duration').type(duration);
  cy.get('.js-input-submit').click();
}

export function deleteSection(upStationName) {
  cy.get(`.js-section-list-item[data-up-station-name="${upStationName}"] .js-section-delete-button`).click({
    force: true,
  });
}
