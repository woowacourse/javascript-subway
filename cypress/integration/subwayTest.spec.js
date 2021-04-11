import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  ID_SELECTOR,
  URL,
} from '../../src/js/constants.js';

const EMAIL = 'wnsah052@naver.com';
const NAME = '한준모';
const PASSWORD = '1';
const ORIGIN_STATION_NAME = '주모바보';
const LINE_NAME = '2호선';

context('로그인 및 정보 수정', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  // TODO: cypress 첫 번째 테스트일 경우 alert를 감지하지 못하는 문제
  it('회원 가입 시 `email`, `name`, `password`에 대한 예외 처리가 작동했을 때, 에러를 출력한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getByHref(URL.LOGIN).click();
    getByHref(URL.SIGNUP).click();

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_EMAIL}`).type(EMAIL);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_NAME}`).type(NAME);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD}`).type(PASSWORD);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}`).type(PASSWORD);

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL
        );
      });
  });

  it('알맞은 이메일과 비밀번호가 있을 때 로그인을 할 수 있는지 테스트한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getByHref(URL.LOGIN).click();

    login().then(() => {
      expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.LOGIN_SUCCESS);
    });
  });

  it('로그인 하게되면 로그인 버튼은 로그아웃 버튼으로 변경된다.', () => {
    login();

    getByHref(URL.LOGIN).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('be.visible');
  });

  it('로그인하지 않은 유저에게는 로그인 외 버튼은 보이지 않는다.', () => {
    // 처음에 not.be.visible
    cy.get(`#${ID_SELECTOR.NAV_STATION}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LINE}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SECTION}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_FULL_MAP}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SEARCH}`).should('not.be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('be.visible');

    login();

    cy.get(`#${ID_SELECTOR.NAV_STATION}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LINE}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SECTION}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_FULL_MAP}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_SEARCH}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('not.be.visible');
  });

  it('로그아웃하고 나면 로그인 버튼으로 변경되어야 한다.', () => {
    login();

    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).click();
    cy.get(`#${ID_SELECTOR.NAV_LOGIN}`).should('be.visible');
    cy.get(`#${ID_SELECTOR.NAV_LOGOUT}`).should('not.be.visible');
  });

  it('로그인 하게되면 정보 수정 페이지로 접근이 가능하다.', () => {
    cy.get(`#${ID_SELECTOR.NAV_MY_INFO}`).should('not.be.visible');
    login();

    cy.get(`#${ID_SELECTOR.NAV_MY_INFO}`).click();
    cy.url().should('eq', `http://127.0.0.1:5500${URL.MY_INFO}`);
  });
});

context('지하철 역 관리 페이지', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('지하철역을 등록할 수 있다.', () => {
    const station = '사당';
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();

    getByHref(URL.STATION).click();
    registerStation(station).then(() => {
      expect(stub.getCall(1)).to.be.calledWith(
        ALERT_MESSAGE.DUPLICATED_STATION_FAIL
      );
    });
  });

  it('지하철역의 이름을 수정할 수 있다.', () => {
    const UPDATE_NAME = '주모천재';

    login();
    getByHref(URL.STATION).click();

    reviseStationName(UPDATE_NAME);
    cy.wait(1000);
    cy.get(`.${CLASS_SELECTOR.STATION_LIST_ITEM}`)
      .eq(0)
      .find('span')
      .invoke('text')
      .should('eq', UPDATE_NAME);
    reviseStationName(ORIGIN_STATION_NAME);
  });

  it('지하철역 삭제할 수 있다.', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();
    getByHref(URL.STATION).click();

    cy.get(`.${CLASS_SELECTOR.STATION_LIST_ITEM_DELETION}`).eq(0).click();
    cy.on('window:confirm', () => true).then(() => {
      expect(stub.getCall(1)).to.be.calledWith(
        ALERT_MESSAGE.STATION_DELETION_SUCCESS
      );
    });

    registerStation(ORIGIN_STATION_NAME);
  });

  it('지하철 노선을 등록할 수 있다.', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();

    getByHref(URL.LINE).click();
    cy.get(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).click();

    registerLine().then(() => {
      expect(stub.getCall(1)).to.be.calledWith(
        ALERT_MESSAGE.DUPLICATED_LINE_FAIL
      );
    });
  });

  it('지하철 노선 수정에 관한 테스트를 한다', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();

    getByHref(URL.LINE).click();

    cy.get(`.${CLASS_SELECTOR.LINE_LIST_ITEM}`)
      .eq(0)
      .find(`.${CLASS_SELECTOR.LINE_LIST_ITEM_UPDATE}`)
      .click();
    cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith(
          ALERT_MESSAGE.LINE_UPDATE_SUCCESS
        );
      });
  });

  it('지하철 노선 삭제에 관한 테스트를 한다', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);

    login();

    getByHref(URL.LINE).click();

    cy.get(`.${CLASS_SELECTOR.LINE_LIST_ITEM_DELETION}`).eq(0).click();

    cy.on('window:confirm', () => true).then(() => {
      expect(stub.getCall(1)).to.be.calledWith(
        ALERT_MESSAGE.LINE_DELETION_SUCCESS
      );
    });

    registerLine();
  });
});

function login() {
  getByHref(URL.LOGIN).click();

  cy.get(`#${ID_SELECTOR.LOGIN_FORM_EMAIL}`).type(EMAIL);
  cy.get(`#${ID_SELECTOR.LOGIN_FORM_PASSWORD}`).type(PASSWORD);
  cy.get(`#${ID_SELECTOR.LOGIN_FORM_SUBMIT}`).click();
}

function registerStation(stationName) {
  cy.get(`#${ID_SELECTOR.STATION_FORM_NAME}`).type(stationName);
  return cy.get(`#${ID_SELECTOR.STATION_FORM_SUBMIT}`).click();
}

function reviseStationName(name) {
  cy.get(`.${CLASS_SELECTOR.STATION_LIST_ITEM}`)
    .eq(0)
    .find(`.${CLASS_SELECTOR.STATION_LIST_ITEM_UPDATE}`)
    .click();
  cy.get(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).clear();
  cy.get(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).type(name);
  cy.get(`#${ID_SELECTOR.STATION_MODAL_FORM_SUBMIT}`).click();
}

function getByHref(href, selector = '#app') {
  return cy.get(selector).find(`[href="${href}"]`);
}

function registerLine() {
  cy.get(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).click();
  cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).type(LINE_NAME);
  //TODO: 역이름 상수화
  cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_UP_STATION}`).select('강남');
  cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION}`).select('잠실');
  cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_DISTANCE}`).type(10);
  cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_DURATION}`).type(10);
  cy.get(`.color-option.bg-green-500`).click();

  return cy.get(`#${ID_SELECTOR.LINE_MODAL_FORM_SUBMIT}`).click();
}
