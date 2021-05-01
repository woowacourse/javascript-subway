import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY, ALERT_MESSAGE } from '../../src/constants.js';
import { $ } from '../../src/utils/dom.js';

const HOST_URL = 'http://localhost:5500/';
const TEST_USER_EMAIL = 'test@naver.com';
const TEST_USER_PASSWORD = 'test123';
const SECONDS_TO_WAIT = 3000;
const SHORT_SECONDS_TO_WAIT = 1500;
const TEST_STATION_DEFAULT_1 = '사당역_테스트';
const TEST_STATION_DEFAULT_2 = '혜화역_테스트';
const TEST_STATION_1 = '역_테스트';
const TEST_STATION_2 = '역_테스트_2';
const TEST_STATION_3 = '역_테스트_3';
const TEST_STATION_UPDATED = '역_테스트_수정';
const TEST_NAME_UNDER_MIN = '역';
const TEST_STATION_OVER_MAX = '역이름을일일이생각해내기가너무어렵네요테스';
const TEST_LINE_OVER_MAX = '역이름을일일이생각해내';
const TEST_LINE_DEFAULT = '1호선_테스트';
const TEST_DEFAULT_DISTANCE = '10';
const TEST_DEFAULT_DURATION = '5';
const TEST_LINE_DEFAULT_COLOR = 'bg-teal-400';
const TEST_LINE = '노선_테스트';
const TEST_LINE_UPDATED = '노선_테스트_수정';
const TEST_LINE_UPDATED_COLOR = 'bg-yellow-400';
const TEST_LINE_FOR_ERROR = '노선_에러_테스트';

// context('계정', () => {
//   before(() => {
//     cy.visit(HOST_URL, {
//       onBeforeLoad(win) {
//         win.sessionStorage.clear();
//       },
//     });
//   });

//   it('로그인 되지 않은 상태에서는 라우팅이 이루어지지 않는다', () => {
//     cy.get(`#${SELECTOR_ID.NAVIGATOR} .${SELECTOR_CLASS.NAVIGATOR_BUTTON}`).then($$navigatorButtons => {
//       [...$$navigatorButtons].forEach(($navigatorButton, i) => {
//         cy.wrap($navigatorButton).click();
//         if (i === $$navigatorButtons.length - 1) {
//           cy.url().should('eq', $navigatorButton.href);
//           return;
//         }
//         cy.url().should('eq', HOST_URL);
//       });
//     });
//   });

//   it('이용자는 로그인을 할 수 있다', () => {
//     checkAccessTokenExist(false);
//     login();
//     cy.wait(SECONDS_TO_WAIT);
//     checkAccessTokenExist(true);
//   });

//   it('이용자는 로그아웃을 할 수 있다', () => {
//     checkAccessTokenExist(true);
//     click(`#${SELECTOR_ID.LOG_OUT_BUTTON}`);
//     checkAccessTokenExist(false);
//     cy.url().should('eq', HOST_URL);
//   });
// });

context('역 관리', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
    login();
    addDefaultStation();
    addDefaultLine();
  });

  it('지하철 역은 2글자 이상이어야 한다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_NAME_UNDER_MIN);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    });
  });

  it('지하철 역의 이름은 최대 20글자 이하여야 한다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_OVER_MAX);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    });
  });

  it('중복된 지하철역은 추가할 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_DEFAULT_1);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    });
  });

  it('엔터키로 역을 추가할 수 있다', () => {
    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_1);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_1).should('exist');
  });

  it('마우스 클릭으로 역을 추가할 수 있다', () => {
    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_2);
    click(`#${SELECTOR_ID.STATION_LIST_ITEM_REGISTER}`);
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_2).should('exist');
  });

  it('새로고침을 해도 역 목록을 그대로 조회할 수 있다', () => {
    const prevStationNames = [];
    const newStationNames = [];
    
    cy.get(`#${SELECTOR_ID.STATION_LIST}`).find('li span').then(($$stationItems) => {
      [...$$stationItems].forEach(($stationItem) => {
        prevStationNames.push($stationItem.textContent);
      });
    });

    cy.visit(HOST_URL);
    cy.wait(SECONDS_TO_WAIT);
    click(`a[href="${PATH.STATIONS}"]`);

    cy.get(`#${SELECTOR_ID.STATION_LIST}`).find('li span').then(($$newStationItems) => {
      [...$$newStationItems].forEach(($newStationItem) => {
        newStationNames.push(($newStationItem.textContent));
      });
    });

    cy.wrap(newStationNames).each((item, idx) => {
      expect(item).to.equal(prevStationNames[idx]);
    });
  });

  it('지하철 역 이름을 수정할 수 있다', () => {
    click(`a[href="${PATH.STATIONS}"]`);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE}[data-station-name="${TEST_STATION_1}"]`)
      .click();
    cy.get(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}`)
      .not('.d-none')
      .clear()
      .type(TEST_STATION_UPDATED);
    cy.get(`#${SELECTOR_ID.MAIN_CONTAINER}`).click('topLeft');
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_UPDATED).should('exist');
  });
  
  it('이미 노선에 등록된 역이면 삭제되지 않는다', () => {
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
    .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_DEFAULT_2}"]`)
    .click();
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_DEFAULT_2).should('exist');
  });

  it('지하철 역을 삭제할 수 있다', () => {
    deleteDefaultLine();
    click(`a[href="${PATH.STATIONS}"]`);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_UPDATED}"]`)
      .click();
    cy.wait(SHORT_SECONDS_TO_WAIT);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_2}"]`)
      .click();
    cy.wait(SHORT_SECONDS_TO_WAIT);
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_UPDATED).should('not.exist');
    cy.contains(`#${SELECTOR_ID.STATION_LIST}`, TEST_STATION_2).should('not.exist');
    deleteDefaultStation();
  });
});

context('노선 관리', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
    login();
    addDefaultStation();
    addDefaultLine();
  });

  after(() => {
    deleteDefaultLine();
    deleteDefaultStation();
  })

  it('노선의 이름은 2글자 이상이어야 한다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_NAME_UNDER_MIN);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
  });
  
  it('노선의 이름은 10글자 이하여야 한다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    
    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_OVER_MAX);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
  });
  
  it('노선의 이름은 중복될 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    
    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_DEFAULT);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
  });

  it('상행역과 하행역을 지정하지 않으면 지하철 노선을 등록할 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_FOR_ERROR);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NO_UP_DOWN_STATION_SELECTED);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE_FOR_ERROR).should('not.exist');
  });

  it('상행역과 하행역이 같은 지하철 노선을 등록할 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_FOR_ERROR);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.UP_STATION_EQUALS_DOWN_STATION);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE_FOR_ERROR).should('not.exist');
  });
  
  it('노선 색깔을 지정하지 않으면 지하철 노선을 등록할 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_FOR_ERROR);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NO_LINE_COLOR_SELECTED);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE_FOR_ERROR).should('not.exist');
  });
  
  it('지하철 노선을 등록할 수 있다', () => {
    click(`a[href="${PATH.LINES}"]`);
    click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
    type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
    cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`);
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE).should('exist');
  });

  it('지하철 노선명 수정 시, 중복된 이름으로 수정할 수 없다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.LINES}"]`);
    cy.get(`#${SELECTOR_ID.LINE_LIST}`)
      .find(`li .${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}[data-line-name="${TEST_LINE}"]`)
      .click();
    cy.get(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`).clear().type(TEST_LINE_DEFAULT);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_UPDATED_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
  });

  it('지하철 노선을 수정할 수 있다', () => {
    click(`a[href="${PATH.LINES}"]`);
    cy.get(`#${SELECTOR_ID.LINE_LIST}`)
      .find(`li .${SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE}[data-line-name="${TEST_LINE}"]`)
      .click();
    cy.get(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`).clear().type(TEST_LINE_UPDATED);
    click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_UPDATED_COLOR}`);
    click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`);
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE_UPDATED).should('exist');
  });

  it('지하철 노선을 삭제할 수 있다', () => {
    click(`a[href="${PATH.LINES}"]`);
    cy.get(`#${SELECTOR_ID.LINE_LIST}`)
      .find(`li .${SELECTOR_CLASS.LINE_DELETE_BUTTON}[data-line-name="${TEST_LINE_UPDATED}"]`)
      .click();
    cy.contains(`#${SELECTOR_ID.LINE_LIST}`, TEST_LINE_UPDATED).should('not.exist');
  });
});

context('구간 관리', () => {
  before(() => {
    cy.visit(HOST_URL, {
      onBeforeLoad(win) {
        win.sessionStorage.clear();
      },
    });
    login();
    addDefaultStation();
    addDefaultLine();
  });

  after(() => {
    deleteDefaultLine();
    deleteDefaultStation();
    click(`a[href="${PATH.STATIONS}"]`);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_3}"]`)
      .click();
    cy.wait(SHORT_SECONDS_TO_WAIT);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_2}"]`)
      .click();
    cy.wait(SHORT_SECONDS_TO_WAIT);
    cy.get(`#${SELECTOR_ID.STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_1}"]`)
      .click();
    cy.wait(SHORT_SECONDS_TO_WAIT);
  });

  it.only('지하철 구간을 등록할 수 있다', () => {
    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_3);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');

    cy.visit(HOST_URL);
    cy.wait(SECONDS_TO_WAIT);

    click(`a[href="${PATH.SECTIONS}"]`);
    click(`#${SELECTOR_ID.SECTION_MODAL_OPEN}`);
    cy.get(`#${SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
    cy.get(`#${SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_3);
    type(`#${SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.SECTION_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`#${SELECTOR_ID.SECTION_MODAL_SUBMIT}`);
    cy.contains(`#${SELECTOR_ID.SECTION_STATION_LIST}`, TEST_STATION_3).should('exist');
  });

  it.only('현재 노선에 등록된 역과 이어진 구간만 등록할 수 있다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    click(`a[href="${PATH.STATIONS}"]`);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_1);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_2);
    type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');

    cy.visit(HOST_URL);
    cy.wait(SECONDS_TO_WAIT);

    click(`a[href="${PATH.SECTIONS}"]`);
    click(`#${SELECTOR_ID.SECTION_MODAL_OPEN}`);
    cy.get(`#${SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_1);
    cy.get(`#${SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_2);
    type(`#${SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
    type(`#${SELECTOR_ID.SECTION_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
    click(`#${SELECTOR_ID.SECTION_MODAL_SUBMIT}`).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.SECTION_MUST_INCLUDED_IN_LINE);
    });
    click(`.${SELECTOR_CLASS.MODAL_CLOSE}`);
  });

  it.only('지하철 구간을 삭제할 수 있다', () => {
    click(`a[href="${PATH.SECTIONS}"]`);
    cy.get(`#${SELECTOR_ID.SECTION_STATION_LIST}`)
      .find(`li .${SELECTOR_CLASS.SECTION_DELETE_BUTTON}[data-station-name="${TEST_STATION_3}"]`)
      .click();
    cy.contains(`#${SELECTOR_ID.SECTION_STATION_LIST}`, TEST_STATION_3).should('not.exist');
  });
});

function addDefaultStation() {
  click(`a[href="${PATH.STATIONS}"]`);
  type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_DEFAULT_1);
  type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');
  cy.get(`#${SELECTOR_ID.STATION_NAME_INPUT}`).clear();
  type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, TEST_STATION_DEFAULT_2);
  type(`#${SELECTOR_ID.STATION_NAME_INPUT}`, '{enter}');
}

function deleteDefaultStation() {
  click(`a[href="${PATH.STATIONS}"]`);
  cy.get(`#${SELECTOR_ID.STATION_LIST}`)
    .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_DEFAULT_1}"]`)
    .click();
  cy.wait(SHORT_SECONDS_TO_WAIT);
  cy.get(`#${SELECTOR_ID.STATION_LIST}`)
    .find(`li .${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE}[data-station-name="${TEST_STATION_DEFAULT_2}"]`)
    .click();
  cy.wait(SHORT_SECONDS_TO_WAIT);
}

function addDefaultLine() {
  click(`a[href="${PATH.LINES}"]`);
  click(`.${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN}`);
  type(`#${SELECTOR_ID.SUBWAY_LINE_NAME}`, TEST_LINE_DEFAULT);
  cy.get(`#${SELECTOR_ID.LINE_MODAL_UP_STATION_SELECT}`).select(TEST_STATION_DEFAULT_1);
  cy.get(`#${SELECTOR_ID.LINE_MODAL_DOWN_STATION_SELECT}`).select(TEST_STATION_DEFAULT_2);
  type(`#${SELECTOR_ID.LINE_MODAL_DISTANCE_INPUT}`, TEST_DEFAULT_DISTANCE);
  type(`#${SELECTOR_ID.LINE_MODAL_DURATION_INPUT}`, TEST_DEFAULT_DURATION);
  click(`.${SELECTOR_CLASS.COLOR_OPTION}.${TEST_LINE_DEFAULT_COLOR}`);
  click(`.${SELECTOR_CLASS.INPUT_SUBMIT}`);
}

function deleteDefaultLine() {
  click(`a[href="${PATH.LINES}"]`);
  cy.get(`#${SELECTOR_ID.LINE_LIST}`)
    .find(`li .${SELECTOR_CLASS.LINE_DELETE_BUTTON}[data-line-name="${TEST_LINE_DEFAULT}"]`)
    .click();
  cy.wait(SHORT_SECONDS_TO_WAIT);
}

function login() {
  click(`a[href="${PATH.LOG_IN}"]`);
  type(`#${SELECTOR_ID.LOG_IN_EMAIL_INPUT}`, TEST_USER_EMAIL);
  type(`#${SELECTOR_ID.LOG_IN_PASSWORD_INPUT}`, TEST_USER_PASSWORD);
  click(`#${SELECTOR_ID.LOG_IN_BUTTON}`);
  cy.wait(SECONDS_TO_WAIT);
}

function click(selector) {
  return cy.get(selector).click();
}

function type(selector, text) {
  return cy.get(selector).type(text);
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
