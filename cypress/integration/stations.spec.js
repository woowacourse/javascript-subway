import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { STATIONS_MESSAGES } from '../../src/js/constants/messages.js';

describe('역 관리 기능테스트', () => {
  const oldUser = {
    name: 'dd',
    email: 'dd@gmail.com',
    password: 'dddd',
  };

  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.LOGIN}`,
    }).as('login');

    cy.intercept({
      method: 'GET',
      url: `${API_ENDPOINT.STATIONS}`,
    }).as('readStation');

    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.STATIONS}`,
    }).as('createStation');

    cy.intercept({
      method: 'PUT',
      url: `${API_ENDPOINT.STATIONS}`,
    }).as('editStation');

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');

    cy.wait('@readStation');
    cy.get('.heading > h2').should('contain', '역 관리');

    cy.window().then((window) => cy.stub(window, 'confirm').returns(true).as('window:confirm'));
  });

  const getStationName = () => `몽촌토성${Date.now()}`;

  it('역 이름을 입력하고 추가버튼을 클릭하면 역 이름 목록 최상단에 역 이름이 추가된다.', () => {
    const stationName = getStationName();

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.wait(['@createStation', '@readStation']);

    cy.get('.station-list-item input[type="text"]').should('have.value', stationName);
    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_ADDED);
  });

  it('중복된 역 이름 추가 시도할 경우, 중복 알림 메세지가 스낵바로 표시된다.', () => {
    const stationName = getStationName();

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.wait(['@createStation', '@readStation']);

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_NAME_ALREADY_EXISTS);
  });

  it('역의 편집버튼을 클릭하여, 역 이름을 수정할 수 있다.', () => {
    const stationName = getStationName();
    const newStationName = `잠실${Date.now()}`;

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.wait(['@createStation', '@readStation']);
    cy.get('.station-list-item input[type="text"]').should('have.value', stationName);

    cy.get('.station-list-item')
      .first()
      .within(() => {
        cy.get('.edit-button').invoke('show').click();
        cy.get('.station-edit-input-field').clear().type(newStationName);
        cy.get('.check-button').click();
        cy.wait('@editStation');
        cy.get('input[type="text"]').should('have.value', newStationName);
      });

    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_UPDATED);
  });

  it('역의 편집버튼을 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 역 이름이 삭제된다.', () => {
    const stationName = getStationName();

    cy.get('#add-station-name').type(stationName);
    cy.get('.submit-button').click();
    cy.wait(['@createStation', '@readStation']);

    cy.get('.station-list-item input[type="text"]').should('have.value', stationName);

    cy.get('.station-list-item')
      .first()
      .within(() => {
        cy.get('.remove-button').invoke('show').click();
      });

    cy.get('@window:confirm').should('be.calledWith', STATIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
    cy.get('.station-list-item input[type="text"]').should('not.have.value', stationName);
    cy.get('#snackbar-container').should('contain', STATIONS_MESSAGES.STATION_HAS_BEEN_REMOVED);
  });
});
