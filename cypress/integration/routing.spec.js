import { ROUTES } from '../../src/js/constants/index.js';

describe('라우팅 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('역 관리 메뉴를 클릭하면 선택한 메뉴가 표시된다.', () => {
    cy.get('header nav a').contains('역 관리').click();
    cy.get('main').contains('역 관리').should('exist');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.STATIONS);
    });

    cy.go('back');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.HOME);
    });

    cy.go('forward');
    cy.location().should(({ pathname }) => {
      expect(pathname).to.eq(ROUTES.STATIONS);
    });
  });
});