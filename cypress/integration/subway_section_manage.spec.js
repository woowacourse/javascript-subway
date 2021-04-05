import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { SELECTOR } from '../../src/js/subway/constants';
import { SESSION_KEY } from '../../src/js/subway/constants/constants';

describe('구간 관리 기능 테스트', () => {
  before(() => {
    const accounts = require('../accounts.json');

    cy.visit('http://localhost:8080/');
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(accounts.email);
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(accounts.password);
    cy.get('.input-submit').click();
    cy.get('[data-link="/sections"]').click();
  });

  it('구간 등록 시, 구간 리스트에 추가한 구간이 출력된다.', () => {
    cy.get(`#${SELECTOR.SECTION.MAIN.LINE_SELECTOR}`).select('439');
    cy.get(`#${SELECTOR.SECTION.MAIN.ADD_MODAL_BUTTON}`).click();
    cy.get(`#${SELECTOR.SECTION.MODAL.UP_STATION_SELECTOR}`).select('1341');
    cy.get(`#${SELECTOR.SECTION.MODAL.DOWN_STATION_SELECTOR}`).select('1647');
    cy.get(`#${SELECTOR.SECTION.MODAL.DISTANCE_INPUT}`).type(5);
    cy.get(`#${SELECTOR.SECTION.MODAL.DURATION_INPUT}`).type(5);
    cy.get(`#${SELECTOR.SECTION.MODAL.SUBMIT_BUTTON}`).click({ force: true });
    cy.get('.js-station-list-item').should('have.length', 3);
  });

  it('구간 제거 시, 구간 리스트에 추가한 구간이 제거된다.', () => {
    cy.get('.js-remove-button:last').click();
    cy.get('.js-station-list-item').should('have.length', 2);
  });
});
