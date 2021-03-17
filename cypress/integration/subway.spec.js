import { SELECTOR_CLASS, SELECTOR_ID } from '../../src/constants.js';

describe('', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });
  // it('Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다', () => {
  //   cy.get(`#${SELECTOR_ID.NAVIGATOR} .${SELECTOR_CLASS.NAVIGATOR_BUTTON}`).then(elements => {
  //     elements.foreEach($navigatorButton => {
  //       cy.get(`#${SELECTOR_ID.MAIN_CONTAINER}`).children().then($container => {
  //         cy.wrap($navigatorButton).click();
  //         cy.url().should('eq', `http://localhost:5500${$navigatorButton.href}`);
  //         cy.get(`#${SELECTOR_ID.MAIN_CONTAINER}`).then($afterContainer => {
  //           expect($container.innerHTML).to.not.equal($afterContainer.innerHTML);
  //         });
  //       });
  //     });
  //   });
  it('Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다', () => {
    cy.get(`#${SELECTOR_ID.NAVIGATOR} .${SELECTOR_CLASS.NAVIGATOR_BUTTON}`).then($$navigatorButtons => {
      [...$$navigatorButtons].forEach($navigatorButton => {
        cy.wrap($navigatorButton).click();
        cy.url().should('eq', `${$navigatorButton.href}`);
        const pathes = $navigatorButton.href.split('/');
        const lastPath = pathes[pathes.length - 1];
        cy.get(`#${SELECTOR_ID.MAIN_CONTAINER} div[test-id="/${lastPath}"]`).should('exist');
      });
    });
  });
});

function click(selector) {
  cy.get(selector).click();
}
