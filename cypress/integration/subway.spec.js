import {
  ALERT_MESSAGE,
  CONFIRM_MESSAGE,
  PATH,
  SELECTOR_CLASS,
  SELECTOR_ID,
  SESSION_STORAGE_KEY,
  VALIDATION,
} from '../../src/constants.js';
import { colorOptions } from '../../src/utils/mock.js'

const HOST_URL = 'http://localhost:5500/';
const TEST_USER_EMAIL = 'chrisTest@gmail.com';
const TEST_USER_PASSWORD = 'test123';

const [station1, station2, station3, station4] = ['테스트역1', '테스트역2', '테스트역3', '테스트역4'];
const [updatedStation1, updatedStation2, updatedStation3, updatedStation4] = ['수정된 테스트역1', '수정된 테스트역2', '수정된 테스트역3', '수정된 테스트역4'];
const [line1, line2, line3, line4] = ['테스트 노선1', '테스트 노선2', '테스트 노선3', '테스트 노선4'];
const [updatedLine1, updatedLine2, updatedLine3, updatedLine4] = ['수정된 노선1', '수정된 노선2', '수정된 노선3', '수정된 노선4']; 

context('계정', () => {
  before(() => {
    cy.visit(HOST_URL);
    cy.window()
      .then(win => cy.stub(win, 'alert'))
      .as('alertStub');
    clearAll();
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
      cy.wait(2000)
      checkAccessTokenExist(true);
    });
  });
  describe('로그인 되어 있을 때', () => {
    it('이용자는 로그아웃을 할 수 있다', () => {
      checkAccessTokenExist(true);
      click(`#${SELECTOR_ID.LOG_OUT_BUTTON}`);
      cy.wait(1000);
      checkAccessTokenExist(false);
      cy.url().should('eq', HOST_URL);
    });
  });
});

context('역 관리', () => {
  before(() => {
    tryLogin();
    click(`a[href="${PATH.STATIONS}"]`);
  });

  describe('역 등록 및 조회', () => {
    it('마우스 클릭으로 역 추가', () => {
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station1);
      click(`#${SELECTOR_ID.STATION_FORM_SUBMIT}`);
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 1);
    });
    it('엔터키로 역 추가', () => {
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station2);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 2);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station3);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 3);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station4);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 4);

    });
    it('중복된 역은 추가할 수 없다', () => {
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station2);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
    });
    it(`추가되는 역은 ${VALIDATION.MIN_STATION_NAME_LENGTH} 글자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하이어야 한다`, () => {
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '역');
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '역역역역역역역역역역역역역역역역역역역역역');
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
    });
  });

  describe('역 수정', () => {
    it('수정 버튼 클릭 시 수정 Input Modal 생성', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`).eq(0).should('not.visible');
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE}`).eq(0).click();
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`).eq(0).should('be.visible');
    });
    it('역 수정', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`).eq(0).focus().clear();
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`).eq(0).type(updatedStation1);
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`).eq(0).blur();
      cy.wait(1000);
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_NAME}`).eq(0).should('have.text', updatedStation1);
    });
    it('역의 이름은 중복되는 이름으로 수정할 수 없다', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE}`).eq(0).click();
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, station2);
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
    });
    it(`수정된 역은 ${VALIDATION.MIN_STATION_NAME_LENGTH} 글자 이상 ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하이어야 한다`, () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE}`).eq(0).click();
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '역');
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE}`).eq(0).click();
      type(
        `#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`,
        '역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역역'
      );
      type(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`, '{enter}');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
      });
      cy.get(`#${SELECTOR_ID.STATION_FORM_NAME_INPUT}`).should('have.value', '');
    });
    after(() => {
      click(`a[href="${PATH.LINES}"]`);
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      type(`#${SELECTOR_ID.LINE_MODAL_NAME_INPUT}`, line1);
      type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, 2);
      type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, 4);
      select(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_INPUT}`, station2);
      select(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_INPUT}`, updatedStation1);
      click(`#${SELECTOR_ID.LINE_MODAL_REGISTER_SUBMIT}`);
      click(`a[href="${PATH.STATIONS}"]`);
    });
  });

  describe('역 삭제', () => {
    it('이미 노선에 등록된 역인 경우 삭제되지 않음', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}`).eq(0).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return true;
      });
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.DELETING_STATION_EXCLUDED_IN_LINE);
      });
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 4);
    });
    it('삭제 confirm 취소 시 역 삭제 X', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}`).eq(3).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return false;
      });
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 4);
    });
    it('삭제 confirm 시 역 삭제', () => {
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}`).eq(3).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return true;
      });
      cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM}`).should('have.length', 3);
    });
  });
});

context('노선 관리', () => {
  before(() => {
    click(`a[href="${PATH.LINES}"]`);
  });

  describe(`노선 등록`, () => {
    it(`노선을 Modal을 통해 등록`, () => {
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      registerLine({
        lineName: line2,
        upStation: updatedStation1,
        downStation: station2,
        duration: 3,
        distance: 4,
        color: colorOptions[10]
      });
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      registerLine({
        lineName: line3,
        upStation: station2,
        downStation: station3,
        duration: 3,
        distance: 4,
        color: colorOptions[10]
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
      cy.get(`#${SELECTOR_ID.LINE_LIST}`).contains(line2);
      cy.get(`#${SELECTOR_ID.LINE_LIST}`).contains(line3);
    });
    it(`중복된 노선 이름이 등록될 수 없다`, () => {
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      registerLine({
        lineName: line2,
        upStation: updatedStation1,
        downStation: station2,
        duration: 3,
        distance: 4,
        color: colorOptions[10]
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
      });
    });
    it(`등록되는 노선의 이름은${VALIDATION.MIN_STATION_NAME_LENGTH}글자 이상, ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하이어야 한다`, () => {
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      registerLine({
        lineName: '노',
        upStation: updatedStation1,
        downStation: station2,
        duration: 3,
        distance: 4,
        color: colorOptions[10]
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
      })
      click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
      registerLine({
        lineName:
          '노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선노선',
        upStation: updatedStation1,
        downStation: station2,
        duration: 3,
        distance: 4,
        color: colorOptions[10]
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
      cy.get(`#${SELECTOR_ID.LINE_LIST}`).contains('테스트 노선2');
      cy.get(`#${SELECTOR_ID.LINE_LIST}`).contains('테스트 노선3');
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
      })
    });
  });

  describe(`노선 수정`, () => {
    it(`노선의 이름, 첫차 시간, 막차 시간, 간격, 색상을 Modal 을 통해 수정`, () => {
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}`).eq(0).click();
      updateLine({
        lineName: updatedLine1,
        color: colorOptions[15]
      })
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).eq(0).contains(updatedLine1);
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
    })
    it(`중복된 노선 이름으로 수정될 수 없다`, () => {
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}`).eq(0).click();
      updateLine({
        lineName: line3,
        color: colorOptions[15]
      })
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
      })
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).eq(0).contains(updatedLine1)
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
    })
    it(`수정되는 노선의 이름은${VALIDATION.MIN_STATION_NAME_LENGTH}글자 이상, ${VALIDATION.MAX_STATION_NAME_LENGTH}자 이하이어야 한다`, () => {
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}`).eq(0).click();
      updateLine({
        lineName: '수',
        color: colorOptions[15]
      });
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
      })
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).eq(0).contains(updatedLine1)
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}`).eq(0).click();
      updateLine({
        lineName: '수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨수정됨',
        color: colorOptions[15]
      });
      cy.on('window:alert', message => {
        expect(message).to.equal(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
      })
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).eq(0).contains(updatedLine1)
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 3);
    })
  })

  describe(`지하철 노선 삭제`, () => {
    it('노선 삭제 confirm', () => {
      cy.get(`.${SELECTOR_CLASS.LINE_DELETE_BUTTON}`).eq(0).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return true;
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 2);
      cy.wait(1000)
    })
    it('노선 삭제 confirm 취소', () => {
      cy.get(`.${SELECTOR_CLASS.LINE_DELETE_BUTTON}`).eq(0).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return false;
      });
      cy.get(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`).should('have.length', 2);
    })
  });
});

context('구간 관리', () => {
  before(() => {
    click(`a[href="${PATH.SECTIONS}"]`);
    cy.wait(1000);
  });

  describe(`구간 등록`, () => {
    it(`구간을 Modal을 통해 등록`, () => {
      cy.get(`.${SELECTOR_CLASS.SECTION_ITEM}`).should('have.length', 2);
      click(`#${SELECTOR_ID.SECTION_MODAL_OPEN}`);
      select(`#${SELECTOR_ID.SECTION_MODAL_LINE_SELECT}`, line2);
      select(`#${SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT}`, station2);
      select(`#${SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT}`, station3);
      type(`#${SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT}`, 10);
      type(`#${SELECTOR_ID.SECTION_MODAL_DURATION_INPUT}`, 30);
      click(`#${SELECTOR_ID.SECTION_MODAL_SUBMIT}`);
      cy.get(`.${SELECTOR_CLASS.SECTION_ITEM}`).should('have.length', 3);
    });
  })

  describe(`구간 삭제`, () => {
    it(`구간 삭제 confirm 취소`, () => {
      cy.get(`.${SELECTOR_CLASS.SECTION_DELETE_BUTTON}`).eq(2).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return false;
      });
      cy.get(`.${SELECTOR_CLASS.SECTION_ITEM}`).should('have.length', 3);
    })
    it(`구간 삭제 confirm`, () => {
      cy.get(`.${SELECTOR_CLASS.SECTION_DELETE_BUTTON}`).eq(2).click();
      cy.on('window:confirm', str => {
        expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
        return true;
      });
      cy.get(`.${SELECTOR_CLASS.SECTION_ITEM}`).should('have.length', 2);
    })
  })
});

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

function tryLogin() {
  cy.get(`body`).then(([$body]) => {
    const $loginButton = $body.querySelector(`a[href="${PATH.LOG_IN}"]`);
    if ($loginButton) {
      click(`a[href="${PATH.LOG_IN}"]`);
      type(`#${SELECTOR_ID.LOG_IN_EMAIL_INPUT}`, TEST_USER_EMAIL);
      type(`#${SELECTOR_ID.LOG_IN_PASSWORD_INPUT}`, TEST_USER_PASSWORD);
      click(`#${SELECTOR_ID.LOG_IN_BUTTON}`);
      cy.wait(1000);
    }
  });
}

function tryLogout() {
  cy.get(`body`).then(([$body]) => {
    const $logoutButton = $body.querySelector(`#${SELECTOR_ID.LOG_OUT_BUTTON}`);
    if ($logoutButton) {
      cy.wrap($logoutButton).click();
    }
  });
}

function select(selector, option) {
  cy.get(selector).select(option);
}

function registerLine({ lineName, upStation, downStation, duration, distance, color }) {
  fillLineRegisterModal({ lineName, upStation, downStation, duration, distance, color });
  click(`#${SELECTOR_ID.LINE_MODAL_REGISTER_SUBMIT}`);
}

function updateLine({ lineName, color }) {
  fillLineUpdateModal({ lineName, color });
  click(`#${SELECTOR_ID.LINE_MODAL_UPDATE_SUBMIT}`);
  cy.wait(1000);
}

function fillLineRegisterModal({ lineName, upStation, downStation, duration, distance, color }) {
  type(`#${SELECTOR_ID.LINE_MODAL_NAME_INPUT}`, lineName);
  type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, duration);
  type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, distance);
  select(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_INPUT}`, upStation);
  select(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_INPUT}`, downStation);
  cy.get(`.${SELECTOR_CLASS.MODAL} .bg-${color}`).click();
}

function fillLineUpdateModal({ lineName, color }) {
  clearInput(`#${SELECTOR_ID.LINE_MODAL_NAME_INPUT}`);
  type(`#${SELECTOR_ID.LINE_MODAL_NAME_INPUT}`, lineName);
  cy.get(`.${SELECTOR_CLASS.LINE_COLOR_PICKER} .bg-${color}`).click();
}

function clearInput(selector) {
  cy.get(selector).focus().clear();
}

function clearAll() {
  tryLogout();
  tryLogin();
  click(`a[href="${PATH.LINES}"]`);
  cy.get(`body`).then(([$body]) => {
    const $$deleteButtons = $body.querySelectorAll(`.${SELECTOR_CLASS.LINE_DELETE_BUTTON}`);
    if ($$deleteButtons) {
      $$deleteButtons.forEach(() => {
        cy.get(`.${SELECTOR_CLASS.LINE_DELETE_BUTTON}`).eq(0).click();
        cy.on('window:confirm', str => {
          expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
          return true;
        });
        cy.wait(500);
      });
    }
  });
  click(`a[href="${PATH.STATIONS}"]`);
  cy.get(`body`).then(([$body]) => {
    const $$deleteButtons = $body.querySelectorAll(`.${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}`);
    if ($$deleteButtons) {
      $$deleteButtons.forEach(() => {
        cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}`).eq(0).click();
        cy.on('window:confirm', str => {
          expect(str).to.equal(CONFIRM_MESSAGE.DELETE);
          return true;
        });
        cy.wait(500);
      });
    }
  });
  tryLogout();
}
