import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY } from '../../src/constants.js';

const HOST_URL = 'http://localhost:5500/';
const TEST_USER_EMAIL = 'test@naver.com';
const TEST_USER_PASSWORD = 'test123';
const WAIT_SECONDS = 2000;

context('계정', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
  });

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
    login();
    cy.wait(WAIT_SECONDS);
    checkAccessTokenExist(true);
  });

  it('이용자는 로그아웃을 할 수 있다', () => {
    checkAccessTokenExist(true);
    click(`#${SELECTOR_ID.LOG_OUT_BUTTON}`);
    checkAccessTokenExist(false);
    cy.url().should('eq', HOST_URL);
  });
});

context('역 관리', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });

    login();
  });

  it('지하철 역은 2글자 이상이어야 한다', () => {
    
  });

  it('지하철 역의 이름은 최대 20글자 이하여야 한다', () => {
    
  });

  it('중복된 지하철역은 추가할 수 없다', () => {
    
  });

  it('엔터키로 역을 추가할 수 있다', () => {
    
  });

  it('마우스 클릭으로 역을 추가할 수 있다', () => {
    
  });

  it('새로고침을 해도 역 목록을 그대로 조회할 수 있다', () => {
    
  });

  it('지하철 역 이름을 수정할 수 있다', () => {
    
  });

  it('지하철 역을 삭제할 수 있다', () => {
    
  });
});

function login() {
  click(`a[href="${PATH.LOG_IN}"]`);
  type(`#${SELECTOR_ID.LOG_IN_EMAIL_INPUT}`, TEST_USER_EMAIL);
  type(`#${SELECTOR_ID.LOG_IN_PASSWORD_INPUT}`, TEST_USER_PASSWORD);
  click(`#${SELECTOR_ID.LOG_IN_BUTTON}`);
}

function click(selector) {
  cy.get(selector).click();
}

function type(selector, text) {
  cy.get(selector).type(text);
}

function checkAccessTokenExist(isExist) {
  cy.window().then(win => {
    const accessToken = win.sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
    if (isExist) {
      expect(accessToken).to.not.equal(null);
      return;
    }
    expect(accessToken).to.equal(null);
  });
}
