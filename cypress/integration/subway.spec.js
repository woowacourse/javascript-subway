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

    cy.get('#station-name').clear();
    cy.get('#station-name').type('연세대');
    cy.get('#station-form').submit();

    cy.get('#station-name').clear();
    cy.get('#station-name').type('고려대');
    cy.get('#station-form').submit();

    cy.get('#station-list .js-station-list-item').should('contain', '낙성대');
    cy.get('#station-list .js-station-list-item').should('contain', '연세대');
  });

  it('지하철역을 수정할 수 있다.', () => {
    cy.get('[data-name="낙성대"] .js-station-edit-button').click();
    cy.get('#station-name-edit-form #station-edit-name').clear();
    cy.get('#station-name-edit-form #station-edit-name').type('서울대');
    cy.get('#station-name-edit-form').submit();
    cy.get('#station-list .js-station-list-item').should('contain', '서울대');
    cy.get('#station-list .js-station-list-item').should('not.contain', '낙성대');
  });

  it('지하철역을 삭제할 수 있다.', () => {
    cy.get('[data-name="서울대"] .js-station-delete-button').click();
    cy.get('#station-list .js-station-list-item').should('not.contain', '서울대');
  });

  it('지하철 노선을 등록할 수 있다.', () => {
    cy.get('#lines-nav-link').click();
    cy.get('#create-line-button').click();
    cy.get('#line-add-form #subway-line-name').type('로이드호선호');
    cy.get('#line-add-form #up-station').select('고려대');
    cy.get('#line-add-form #down-station').select('연세대');
    cy.get('#duration').type('10');
    cy.get('#distance').type('10');
    cy.get('#line-add-form .js-subway-line-color-selector .bg-gray-300').click();
    cy.get('#line-add-form .js-input-submit').click({ force: true });

    cy.get('.js-line-list-item[data-name="로이드호선호"]').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선호"] .subway-line-color-dot.bg-gray-300').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선호"] .js-line-name').should('have.text', '로이드호선호');

    cy.get('#lines-nav-link').click();
    cy.get('#create-line-button').click();
    cy.get('#line-add-form #subway-line-name').type('로이드호선메우');
    cy.get('#line-add-form #up-station').select('고려대');
    cy.get('#line-add-form #down-station').select('연세대');
    cy.get('#duration').type('10');
    cy.get('#distance').type('10');
    cy.get('#line-add-form .js-subway-line-color-selector .bg-gray-300').click();
    cy.get('#line-add-form .js-input-submit').click({ force: true });

    cy.get('.js-line-list-item[data-name="로이드호선메우"]').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선메우"] .subway-line-color-dot.bg-gray-300').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선메우"] .js-line-name').should('have.text', '로이드호선메우');
  });

  it('지하철 노선을 수정할 수 있다.', () => {
    cy.get('[data-name="로이드호선호"] .js-line-edit-button').click({ force: true });
    cy.get('#line-edit-form #subway-line-name').clear().type('로이드포코');
    cy.get('#line-edit-form .bg-purple-300').click();
    cy.get('#line-edit-form .js-input-submit').click({ force: true });

    cy.get('[data-name="로이드포코"]').should('exist');
    cy.get('[data-name="로이드포코"] .subway-line-color-dot.bg-purple-300').should('exist');
    cy.get('[data-name="로이드포코"] .js-line-name').should('have.text', '로이드포코');
  });

  it('지하철 노선을 삭제할 수 있다.', () => {
    cy.get('[data-name="로이드포코"] .js-line-delete-button').click({ force: true });
    cy.get('.js-line-list-item').should('not.contain', '로이드포코');
  });
});
