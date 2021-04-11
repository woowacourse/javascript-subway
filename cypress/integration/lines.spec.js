import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { LINES_MESSAGES } from '../../src/js/constants/messages.js';

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

const addStation = (name) => {
  cy.get('#add-station-name').type(name);
  cy.get('.submit-button').click();
  cy.wait('@createStation');
  cy.wait('@readStation');

  cy.get('.station-list-item .station-edit-input-field').should('have.value', name);
};

const addLineListItem = (item) => {
  cy.get('#add-line-name').type(item.name);
  cy.get('#add-up-station').select(item.upStation);
  cy.get('#add-down-station').select(item.downStation);
  cy.get('#add-distance').type(item.distance);
  cy.get('#add-duration').type(item.duration);
  cy.get('.submit-button').click();
  cy.wait('@createLine');

  cy.get('.line-list-item .edit-line-name').should('have.value', item.name);
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

describe('노선 관리 기능 테스트', () => {
  before(() => {
    intercept();

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');

    cy.get('.heading > h2').should('contain', '역 관리');
    stations.forEach(addStation);

    cy.get(`a[href*="${PATHNAMES.LINES}"]`).click();
    cy.wait('@readLine');
    cy.get('.heading > h2').should('contain', '노선 관리');
    addLineListItem(testLineItem);
  });

  beforeEach(() => {
    intercept();
    cy.window().then((window) => cy.stub(window, 'confirm').returns(true).as('window:confirm'));
  });

  it('노선 이름, 상행역, 하행역, 거리, 시간 입력하면 추가된다.', () => {
    cy.get('.line-list-item input[type="text"]').should('have.value', testLineItem.name);
  });

  it('중복된 노선 이름 추가 시도할 경우, 중복 알림 메세지가 스낵바로 표시된다.', () => {
    addLineListItem(testLineItem);

    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
  });

  it('노선의 편집버튼을 클릭하여, 노선 정보를 수정할 수 있다.', () => {
    const editedItem = {
      name: Date.now().toString().slice(-10),
      upStation: '구파발',
      downStation: '대화',
      distance: 300,
      duration: 120,
    };

    cy.get('.line-list-item')
      .first()
      .within(() => {
        cy.get('.edit-button').invoke('show').click();
        cy.get('.edit-line-name').clear().type(editedItem.name);
        cy.get('.check-button').click();
        cy.wait('@editLine');

        cy.get('.edit-line-name').should('have.value', editedItem.name);
      });

    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_HAS_BEEN_UPDATED);
  });

  it('역의 편집버튼 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 노선이 삭제된다.', () => {
    cy.get('.line-list-item')
      .first()
      .within(() => {
        cy.get('.remove-button').invoke('show').click();
      });

    cy.get('@window:confirm').should('be.calledWith', LINES_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_HAS_BEEN_REMOVED);
  });
});
