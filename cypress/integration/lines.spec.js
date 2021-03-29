import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';
import { LINES_MESSAGES } from '../../src/js/constants/messages.js';

describe('노선 관리 기능 테스트', () => {
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

  const addStation = (name) => {
    cy.get('#add-station-name').type(name);
    cy.get('.submit-button').click();
  };

  const addLineListItem = (item) => {
    cy.get('#add-line-name').type(item.name);
    cy.get('#add-up-station').select(item.upStation);
    cy.get('#add-down-station').select(item.downStation);
    cy.get('#add-distance').type(item.distance);
    cy.get('#add-duration').type(item.duration);
    cy.get('.submit-button').click();
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

    ['사당', '잠실', '구파발', '대화'].forEach(addStation);

    cy.get(`a[href*="${PATHNAMES.LINES}"]`).click();
    addLineListItem(testLineItem);
  });

  it('노선 이름, 상행역, 하행역, 거리, 시간 입력하면 추가된다.', () => {
    cy.get('.line-list-item').should('contain', testLineItem.name);
  });

  it('중복된 역 이름 추가 시도할 경우, 중복 알림 메세지가 스낵바로 표시된다.', () => {
    addLineListItem(testLineItem);

    cy.get('.line-list-item').first().should('contain', testLineItem.name);
    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
  });

  it('노선의 편집버튼을 클릭하여, 노선 정보를 수정할 수 있다.', () => {
    const editedItem = {
      name: '3호선',
      upStation: '구파발',
      downStation: '대화',
      distance: 300,
      duration: 120,
    };

    cy.get('.edit-button').click();
    cy.get('.edit-line-name').type(editedItem.name);
    cy.get('.edit-up-station').type(editedItem.upStation);
    cy.get('.edit-down-station').type(editedItem.downStation);
    cy.get('.edit-duration').type(editedItem.duration);
    cy.get('.check-button').click();

    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_HAS_BEEN_UPDATED);
    cy.get('.line-list-item').should('not.contain', testLineItem.name);
    cy.get('.line-list-item').should('contain', editedItem.name);
  });

  it('역의 편집버튼 클릭 후 삭제버튼을 클릭하면 confirm창이 뜨고, 확인을 누르면 노선이 삭제된다.', () => {
    cy.get('.edit-button').click();
    cy.get('.remove-button').click();

    cy.get('@window:confirm').should('be.calledWith', LINES_MESSAGES.ARE_YOU_SURE_TO_REMOVE);
    cy.get('#snackbar-container').should('contain', LINES_MESSAGES.LINE_HAS_BEEN_REMOVED);
    cy.get('.line-list-item').should('not.contain', testLineItem.name);
  });
});
