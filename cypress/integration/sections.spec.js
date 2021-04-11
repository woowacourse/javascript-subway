import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { SECTIONS_MESSAGES } from '../../src/js/constants/messages.js';

describe('구간 관리 기능 테스트', () => {
  const oldUser = {
    name: 'dd',
    email: 'dd@gmail.com',
    password: 'dddd',
  };

  const stations = ['사당', '잠실', '구파발', '대화'].map((name) => name + Date.now());

  const testLineItem = {
    name: Date.now().toString().slice(-10),
    upStation: stations[0],
    downStation: stations[1],
    distance: 250,
    duration: 70,
  };

  const newSectionItem = {
    name: stations[2],
    distance: 100,
    duration: 30,
  };

  const addStation = (name) => {
    cy.get('#add-station-name').type(name);
    cy.get('.submit-button').click();
    cy.wait('@createStation');
    cy.wait('@readStation');

    cy.get('.station-list-item .station-edit-input-field').should('have.value', name);
  };

  const addLineListItem = ({ name, upStation, downStation, distance, duration }) => {
    cy.get('#add-line-name').type(name);
    cy.get('#add-up-station').select(upStation);
    cy.get('#add-down-station').select(downStation);
    cy.get('#add-distance').type(distance);
    cy.get('#add-duration').type(duration);
    cy.get('.submit-button').click();
    cy.wait('@createLine');

    cy.get('.line-list-item .edit-line-name').should('have.value', name);
  };

  const addSectionListItem = ({ name, distance, duration }) => {
    cy.get('.plus-button').first().click();
    cy.get('#station-select').select(name);
    cy.get('#distance').type(distance);
    cy.get('#duration').type(duration);
    cy.get('.check-button').click();
    cy.wait('@createLine');

    cy.get('.section-list-item .station').should('contain', name);
  };

  const intercept = () => {
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

    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.LINES}`,
    }).as('createLine');

    cy.intercept({
      method: 'GET',
      url: `${API_ENDPOINT.LINES}`,
    }).as('readLine');

    cy.intercept({
      method: 'PUT',
      url: `${API_ENDPOINT.LINES}`,
    }).as('editLine');
  };

  before(() => {
    intercept();

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');

    cy.wait('@readStation');
    cy.get('.heading > h2').should('contain', '역 관리');
    stations.forEach(addStation);

    cy.get(`a[href*="${PATHNAMES.LINES}"]`).click();
    cy.wait('@readLine');
    cy.get('.heading > h2').should('contain', '노선 관리');
    addLineListItem(testLineItem);

    cy.wait('@readLine');
    cy.get(`a[href*="${PATHNAMES.SECTIONS}"]`).click();
    cy.get('.heading > h2').should('contain', '구간 관리');

    cy.get('#line-select').select(testLineItem.name);
    cy.get('.section-list-item .station').should('contain', testLineItem.upStation);
  });

  beforeEach(() => {
    intercept();
    cy.window().then((window) => cy.stub(window, 'confirm').returns(true).as('window:confirm'));
  });

  it('구간의 편집버튼을 클릭하여, 새로운 구간을 추가할 수 있다.', () => {
    addSectionListItem(newSectionItem);

    cy.get('#snackbar-container').should('contain', SECTIONS_MESSAGES.SECTION_HAS_BEEN_ADDED);
    cy.get('span').should('contain', newSectionItem.name);
  });

  it('구간의 편집버튼 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 구간이 삭제된다.', () => {
    const targetIndexToRemove = 1;

    cy.get('.remove-button').eq(targetIndexToRemove).invoke('show').click();

    cy.get('@window:confirm').should('be.calledWith', SECTIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
    cy.get('span').should('not.contain', newSectionItem.name);
    cy.get('#snackbar-container').should('contain', SECTIONS_MESSAGES.SECTION_HAS_BEEN_REMOVED);
  });
});
