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

  it('지하철역을 수정할 수 있다.', () => {
    cy.get('[data-name="낙성대"] .js-station-edit-button').click();
    cy.get('[data-name="낙성대"] .js-name-edit').clear();
    cy.get('[data-name="낙성대"] .js-name-edit').type('서울대');
    cy.get('[data-name="낙성대"] .js-station-save-button').click();
    cy.get('#station-list .station-list-item').should('contain', '서울대');
    cy.get('#station-list .station-list-item').should('not.contain', '낙성대');
  });

  it('지하철역을 삭제할 수 있다.', () => {
    cy.get('[data-name="서울대"] .js-station-delete-button').click();
    cy.get('#station-list .station-list-item').should('not.contain', '서울대');
  });

  it('지하철 노선을 등록할 수 있다.' () => {
    cy.get('#lines-nav-link').click();
    cy.get('#create-line-button').click();
    cy.get('#subway-line-name').type('8호선');
    cy.get('#up-time').type('05:00');
    cy.get('#down-time').type('24:00');
    cy.get('#interval-time').type('10');
  })
});
