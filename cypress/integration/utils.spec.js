export function click(selector) {
  cy.get(selector).click();
}

export function type(selector, text) {
  cy.get(selector).type(text);
}
