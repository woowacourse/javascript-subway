import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { STATIONS_MESSAGES } from '../../src/js/constants/messages.js';

describe('역 관리 기능테스트', () => {
  const oldUser = {
    name: '하루',
    email: '365kim@gmail.com',
    password: '365',
  };

  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.LOGIN}`,
    }).as('login');

    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.STATIONS}`,
    }).as('createStation');

    cy.intercept({
      method: 'GET',
      url: `${API_ENDPOINT.STATIONS}`,
    }).as('readStation');

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');
    cy.wait('@readStation');
  });

  const stationName = `몽촌토성00009`;

  it('역 이름을 입력하고 추가버튼을 클릭하면 역 이름 목록 최상단에 역 이름이 추가된다.', () => {
    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();

    cy.wait('@createStation');
    cy.wait('@readStation');

    cy.get('.station-list-item')
      .first()
      .get('input[type="text"]')
      .then(($el) => {
        const [$newStation] = $el;

        expect($newStation.value).to.be.equal(stationName);
      });

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_ADDED);
  });

  it('중복된 역 이름 추가 시도할 경우, 중복 알림 메세지가 스낵바로 표시된다.', () => {
    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_NAME_ALREADY_EXISTS);
  });

  it('역의 편집버튼을 클릭하여, 역 이름을 수정할 수 있다.', () => {
    const newStationName = '잠실';

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.get('.edit-button').first().click();

    cy.get('.edit-station-name').first().clear({ force: true }).type(newStationName);
    cy.get('.check-button').first().click();

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_UPDATED);

    cy.get('.station-list-item input[type="text"]')
      .first()
      .then(($el) => {
        const [$newStation] = $el;

        expect($newStation.value).to.be.equal(newStationName);
      });
  });

  it('역의 편집버튼을 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 역 이름이 삭제된다.', () => {
    const stub = cy.stub();
    cy.on('window:confirm', stub);

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.get('.edit-button').first().click();
    cy.get('.remove-button')
      .first()
      .click({ force: true })
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(STATIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
      });

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_REMOVED);
    cy.get('.station-list-item').should('not.contain', stationName);
  });
});
