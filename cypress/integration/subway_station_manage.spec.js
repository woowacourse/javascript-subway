import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { SELECTOR } from '../../src/js/subway/constants';
import { SESSION_KEY } from '../../src/js/subway/constants/constants';

describe('역 관리 기능 테스트', () => {
  before(() => {
    const accounts = require('../accounts.json');

    cy.visit('http://localhost:8080/');
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(accounts.email);
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(accounts.password);
    cy.get('.input-submit').click();
    cy.get('[data-link="/stations"]').click();
  });

  it('역 추가 시, 역이름이 2 ~ 20글자가 아니면 에러 메시지를 렌더링한다.', () => {
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type('a');
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_MSG}`).should('be.visible');
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type('a'.repeat(21));
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_MSG}`).should('be.visible');
  });

  it('지하철 역을 등록 시, 역 리스트에 추가된 역이름이 노출된다.', () => {
    const randomName = Date.now().toString().slice(-4);
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).clear();
    cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type(randomName);
    cy.get(`#${SELECTOR.STATION.MAIN.SUBMIT_BUTTON}`).click();
    cy.get('.js-station-list-item:last > .js-station-name').should('have.text', randomName);
  });

  it('지하철 역 이름을 수정 시, 수정된 역 이름이 역 리스트에 출력된다.', () => {
    const randomName = Date.now().toString().slice(-4);
    cy.get('.js-station-list-item:last > .js-modify-button').click();
    cy.get(`#${SELECTOR.STATION.MODAL.FORM}`).should('be.visible');
    cy.get(`#${SELECTOR.STATION.MODAL.NAME_INPUT}`).clear();
    cy.get(`#${SELECTOR.STATION.MODAL.NAME_INPUT}`).type(randomName);
    cy.get(`#${SELECTOR.STATION.MODAL.SUBMIT_BUTTON}`).click();
    cy.get('.js-station-list-item:last > .js-station-name').should('have.text', randomName);
  });

  it('지하철 역 이름을 삭제 시, 역 리스트에서 해당 역 이름이 제거된다.', () => {
    cy.get('.js-station-list-item:last > .js-remove-button').click();
    cy.get('.js-station-list-item').should('have.length', 2);
  });
});
