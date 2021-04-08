import { ELEMENT } from '../../src/js/utils/constants';

Cypress.on('uncaught:exception', () => false);

describe('로그인한 유저는 지하철 노선도 관리를 할 수 있다.', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`).type('abcd@naver.com');
    cy.get(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`).type('12341234');
    cy.get(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`).click();
  });

  it('역 관리 버튼 누르면 역 관리 페이지가 나오고, 역을 추가할 수 있다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_STATION_BUTTON}`).click();
    cy.get(`#${ELEMENT.STATION_NAME}`).type('리뷰어님{enter}');
    cy.get(`#${ELEMENT.STATION_NAME}`).type('크리스{enter}');
    cy.get(`#${ELEMENT.STATION_NAME}`).type('제이비{enter}');
    cy.get(`#${ELEMENT.STATION_NAME}`).type('사랑해요{enter}');
    cy.get(`.${ELEMENT.STATION_LIST_ITEM}`).its('length').should('be.gte', 4);
  });

  it('역 이름을 수정할 수 있다.', () => {
    cy.get(`.${ELEMENT.STATION_LIST_ITEM_EDIT_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.MODAL_STATION_NAME_EDIT_INPUT}`).type('천재{enter}');
    cy.wait(200);
    cy.get(`.${ELEMENT.STATION_LIST_ITEM}`).eq(0).contains('천재');
  });

  it('역을 삭제할 수 있다.', () => {
    cy.get(`.${ELEMENT.STATION_LIST_ITEM_REMOVE_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.STATION_LIST_ITEM}`).its('length').should('be.gte', 3);
  });

  it('노선 관리 버튼 누르면 노선 관리 페이지가 나오고, 노선을 추가할 수 있다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_LINE_BUTTON}`).click();
    cy.get(`.${ELEMENT.CREATE_LINE_BUTTON}`).click();
    cy.get(`.${ELEMENT.MODAL_LINE_NAME}`).type('우테코선');
    cy.get(`#${ELEMENT.UP_STATION}`).select('크리스');
    cy.get(`#${ELEMENT.DOWN_STATION}`).select('제이비');
    cy.get(`.${ELEMENT.MODAL_LINE_DISTANCE}`).type('30');
    cy.get(`.${ELEMENT.MODAL_LINE_DURATION}`).type('20');
    cy.get('.bg-blue-300').click();
    cy.get(`.${ELEMENT.MODAL_LINE_SUBMIT_BUTTON}`).click();
  });

  it('노선 이름과 색을 수정할 수 있다.', () => {
    cy.get(`.${ELEMENT.LINE_LIST_ITEM_EDIT_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.MODAL_LINE_NAME}`).type('우테코우테코선');
    cy.get('.bg-red-300').click();
    cy.get(`.${ELEMENT.MODAL_LINE_SUBMIT_BUTTON}`).click();
    cy.wait(200);
  });

  it('노선을 삭제할 수 있다.', () => {
    cy.get(`.${ELEMENT.LINE_LIST_ITEM_REMOVE_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.STATION_LIST_ITEM}`).should('have.length', 0);
  });

  it('구간 관리 버튼 누르면 구간 관리 페이지가 나오고, 구간을 추가할 수 있다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_LINE_BUTTON}`).click();
    cy.get(`.${ELEMENT.CREATE_LINE_BUTTON}`).click();
    cy.get(`.${ELEMENT.MODAL_LINE_NAME}`).type('우테코선');
    cy.get(`#${ELEMENT.UP_STATION}`).select('크리스');
    cy.get(`#${ELEMENT.DOWN_STATION}`).select('제이비');
    cy.get(`.${ELEMENT.MODAL_LINE_DISTANCE}`).type('30');
    cy.get(`.${ELEMENT.MODAL_LINE_DURATION}`).type('20');
    cy.get('.bg-blue-300').click();
    cy.get(`.${ELEMENT.MODAL_LINE_SUBMIT_BUTTON}`).click();

    cy.get(`.${ELEMENT.NAV_BAR_SECTION_BUTTON}`).click();
    cy.get(`.${ELEMENT.CREATE_SECTION_BUTTON}`).click();
    cy.get(`.${ELEMENT.MODAL_LINE_OPTIONS_WRAPPER}`).select('우테코선');
    cy.get(`#${ELEMENT.UP_STATION}`).select('제이비');
    cy.get(`#${ELEMENT.DOWN_STATION}`).select('사랑해요');
    cy.get(`.${ELEMENT.MODAL_LINE_DISTANCE}`).type('5');
    cy.get(`.${ELEMENT.MODAL_LINE_DURATION}`).type('5{enter}');
    cy.wait(200);
    cy.get(`.${ELEMENT.SECTION_LIST_ITEM}`).its('length').should('be.gte', 3);
  });

  it('구간을 삭제할 수 있다.', () => {
    cy.get(`.${ELEMENT.SECTION_LIST_ITEM_REMOVE_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.SECTION_LIST_ITEM}`).its('length').should('be.gte', 2);
  });

  it('다음 테스트를 위해 데이터를 모두 삭제한다.', () => {
    cy.get(`.${ELEMENT.NAV_BAR_LINE_BUTTON}`).click();
    cy.get(`.${ELEMENT.LINE_LIST_ITEM_REMOVE_BUTTON}`).eq(0).click();
    cy.get(`.${ELEMENT.NAV_BAR_STATION_BUTTON}`).click();
    cy.get(`.${ELEMENT.STATION_LIST_ITEM_REMOVE_BUTTON}`).click({ multiple: true });
    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
  });
});
