import { ROUTES } from '../../src/js/constants/index.js';

describe('라우팅 테스트', () => {
  const oldUser = {
    name: '하루',
    email: '365kim@gmail.com',
    password: '365',
  };

  beforeEach(() => {
    cy.visit('/');
    cy.get(`a[href="${ROUTES.LOGIN}"]`).click();
    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);
    cy.get('button[type="submit"]').click();
  });

  it('역 관리 메뉴를 클릭하면 선택한 메뉴가 표시된다.', () => {
    cy.contains('역 관리').click();
    cy.get('main').contains('역 관리').should('exist');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.STATIONS);
    });

    cy.go('back');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.LOGIN);
    });

    cy.go('forward');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.STATIONS);
    });
  });
});
