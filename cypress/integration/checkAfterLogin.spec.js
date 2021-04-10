import { login } from '../support/auth';

describe('로그인 후 페이지 확인', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    login();
  });

  it('[역 관리] 메뉴를 클릭하면, 역 관리 페이지가 렌더된다.', () => {
    cy.get('#stations-nav-link').click();
    cy.url().should('include', '/stations');
    cy.get('#stations-container').should('exist');
  });
});
