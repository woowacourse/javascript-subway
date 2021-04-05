import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { SELECTOR } from '../../src/js/subway/constants';
import { SESSION_KEY } from '../../src/js/subway/constants/constants';

describe('노선 관리 기능 테스트', () => {
  before(() => {
    const accounts = require('../accounts.json');

    cy.visit('http://localhost:8080/');
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(accounts.email);
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(accounts.password);
    cy.get('.input-submit').click();
    cy.get('[data-link="/lines"]').click();
  });

  it('노선 추가 시, 노선 이름이 2 ~ 10글자가 아니면 에러 메시지를 렌더링한다.', () => {
    cy.get(`#${SELECTOR.LINE.MAIN.ADD_MODAL_BUTTON}`).click();
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type('a');
    cy.get(`#${SELECTOR.LINE.MODAL.MSG}`).should('be.visible');
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type('a'.repeat(11));
    cy.get(`#${SELECTOR.LINE.MODAL.MSG}`).should('be.visible');
  });

  it('노선 등록 시, 노선 리스트에 추가한 노선이름을 출력한다.', () => {
    const randomName = Date.now().toString().slice(-5);
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type(`${randomName}`);
    cy.get(`#${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}`).select('1340');
    cy.get(`#${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}`).select('1341');
    cy.get(`#${SELECTOR.LINE.MODAL.DISTANCE_INPUT}`).type(2);
    cy.get(`#${SELECTOR.LINE.MODAL.DURATION_INPUT}`).type(10);
    cy.get(`#${SELECTOR.LINE.MODAL.SUBMIT_BUTTON}`).click({ force: true });
    cy.get('.js-line-list-item').get('.js-line-name').last().should('have.text', randomName);
  });

  it('노선 수정 시, 노선 리스트에 해당 노선의 이름을 출력한다.', () => {
    cy.get('.js-modify-button:first').click();
    const randomName = Date.now().toString().slice(-5);
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
    cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type(`${randomName}`);
    cy.get(`#${SELECTOR.LINE.MODAL.SUBMIT_BUTTON}`).click();
    cy.wait(500);
    cy.get('.js-line-list-item').get('.js-line-name').first().should('have.text', randomName);
  });

  it('노선 삭제 시, 노선 리스트에서 해당 노선의 이름이 제거한다.', () => {
    cy.get('.js-remove-button:first').click();
    cy.get('.js-line-list-item:last > .js-line-name').should('not.exist');
  });
});
