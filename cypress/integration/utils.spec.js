export function click(selector) {
  cy.get(selector).click();
}

export function type(selector, text) {
  cy.get(selector).type(text);
}

export function select(selector, option) {
  cy.get(selector).select(option);
}