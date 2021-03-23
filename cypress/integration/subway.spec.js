function login(id, pw) {
  cy.get('#email').type(id);
  cy.get('#password').type(pw);
  cy.get('#login-form').submit();
}

describe('지하철 노선도 STEP1', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    login('test123@test123.com', 'test123');
  });

  it('[역 관리] 메뉴를 클릭하면, 역 관리 페이지가 렌더된다.', () => {
    cy.get('#stations-nav-link').click();
    cy.url().should('include', '/stations');
    cy.get('#stations-container').should('exist');
  });
});

describe('지하철 노선도 STEP2', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login('test123@test123.com', 'test123');
  });

  it('지하철 역을 등록할 수 있다.', () => {
    cy.get('#station-name').type('낙성대');
    cy.get('#station-form').submit();
    cy.get('#station-list .station-list-item').should('contain', '낙성대');
  });

  it('지하철역을 삭제할 수 있다.', () => {
    cy.get('[data-name="낙성대"] .js-station-delete-button').click();
    cy.get('#station-list .station-list-item').should('not.contain', '낙성대');
  });
});
