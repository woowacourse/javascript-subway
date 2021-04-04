import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY } from '../../src/constants.js';
import { click, type } from './utils.spec.js';

const HOST_URL = 'http://localhost:5500/';
const TEST_USER_EMAIL = 'test@naver.com';
const TEST_USER_PASSWORD = 'test123';
const WAIT_SECONDS = 2000;

context('지하철 노선도', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
  });

  describe('로그아웃 되어 있을 때', () => {
    it('로그인 되지 않은 상태에서는 라우팅이 이루어지지 않는다', () => {
      cy.get(`#${SELECTOR_ID.NAVIGATOR} .${SELECTOR_CLASS.NAVIGATOR_BUTTON}`).then($$navigatorButtons => {
        [...$$navigatorButtons].forEach(($navigatorButton, i) => {
          cy.wrap($navigatorButton).click();
          if (i === $$navigatorButtons.length - 1) {
            cy.url().should('eq', $navigatorButton.href);
            return;
          }
          cy.url().should('eq', HOST_URL);
        });
      });
    });

    it('이용자는 로그인을 할 수 있다', () => {
      checkAccessTokenExist(false);
      click(`a[href="${PATH.LOG_IN}"]`);
      type(`#${SELECTOR_ID.LOG_IN_EMAIL_INPUT}`, TEST_USER_EMAIL);
      type(`#${SELECTOR_ID.LOG_IN_PASSWORD_INPUT}`, TEST_USER_PASSWORD);
      click(`#${SELECTOR_ID.LOG_IN_BUTTON}`);
      cy.wait(WAIT_SECONDS);
      checkAccessTokenExist(true);
    });
  });
  describe('로그인 되어 있을 때', () => {
    it('이용자는 로그아웃을 할 수 있다', () => {
      checkAccessTokenExist(true);
      click(`#${SELECTOR_ID.LOG_OUT_BUTTON}`);
      checkAccessTokenExist(false);
      cy.url().should('eq', HOST_URL);
    });
  });
});

export function checkAccessTokenExist(isExist) {
  cy.window().then(win => {
    const accessToken = win.sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
    if (isExist) {
      expect(accessToken).to.not.equal(null);
      return;
    }
    expect(accessToken).to.equal(null);
  });
}
