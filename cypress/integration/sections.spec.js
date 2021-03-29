import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { SECTIONS_MESSAGES } from '../../src/js/constants/messages.js';

describe('구간 관리 기능 테스트', () => {
  const oldUser = {
    name: '하루',
    email: '365kim@gmail.com',
    password: '365',
  };

  const testLineItem = {
    name: '2호선',
    upStation: '사당',
    downStation: '잠실',
    distance: 250,
    duration: 70,
  };

  const newSectionItem = {
    name: '강남',
    distance: 100,
    duration: 30,
  };

  const addStation = (name) => {
    cy.get('#add-station-name').type(name);
    cy.get('.submit-button').click();
  };

  const addLineListItem = ({ name, upStation, downStation, distance, duration }) => {
    cy.get('#add-line-name').type(name);
    cy.get('#add-up-station').select(upStation);
    cy.get('#add-down-station').select(downStation);
    cy.get('#add-distance').type(distance);
    cy.get('#add-duration').type(duration);
    cy.get('.submit-button').click();
  };

  const addSectionListItem = ({ name, distance, duration }) => {
    cy.get('.edit-button').click();
    cy.get('.plus-button').first().click();
    cy.get('.section-list-item select').select(name);
    cy.get('input.distance').type(distance);
    cy.get('input.duration').type(duration);
    cy.get('.line-check-button').click();
  };

  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: `${API_ENDPOINT.LOGIN}`,
    }).as('login');

    cy.window().then((window) => {
      cy.stub(window, 'confirm').returns(true).as('window:confirm');
    });

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');

    ['사당', '잠실', '강남'].forEach(addStation);

    cy.get(`a[href*="${PATHNAMES.LINES}"]`).click();
    addLineListItem(testLineItem);

    cy.get(`a[href*="${PATHNAMES.SECTIONS}"]`).click();
  });

  it('구간의 편집버튼을 클릭하여, 새로운 구간을 추가할 수 있다.', () => {
    addSectionListItem(newSectionItem);

    cy.get('#snackbar-container').should('contain', SECTIONS_MESSAGES.SECTION_HAS_BEEN_ADDED);
    cy.get('span').should('contain', newSectionItem.name);
  });

  it('구간의 편집버튼 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 구간이 삭제된다.', () => {
    const targetIndexToRemove = 1;

    addSectionListItem(newSectionItem);

    cy.get('.edit-button').click();
    cy.get('.remove-button').eq(targetIndexToRemove).click();

    cy.get('@window:confirm').should('be.calledWith', SECTIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
    cy.get('#snackbar-container').should('contain', SECTIONS_MESSAGES.SECTION_HAS_BEEN_REMOVED);
    cy.get('span').should('not.contain', newSectionItem.name);
  });
});
