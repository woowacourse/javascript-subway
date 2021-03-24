import PATHNAMES from '../../src/js/constants/rawPathnames.js';
import { API_ENDPOINT } from '../../src/js/constants/api.js';

describe('라우팅 테스트', () => {
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

    cy.visit('/');
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');
  });

  it('역 관리 메뉴에서 뒤로가기를 하면 이전 페이지가, 앞으로 가기를 하면 다음 페이지가 표시된다.', () => {
    cy.location().should(({ pathname }) => {
      expect(pathname).to.match(new RegExp(`${PATHNAMES.STATIONS}$`));
    });

    cy.go('back');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.match(new RegExp(`${PATHNAMES.LOGIN}$`));
    });

    cy.go('forward');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.match(new RegExp(`${PATHNAMES.STATIONS}$`));
    });
  });
});
