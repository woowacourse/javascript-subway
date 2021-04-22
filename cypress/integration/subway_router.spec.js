describe('subway-router-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('로그인 메뉴 버튼을 누르면 로그인 라우터로 이동한다', () => {
    cy.get('.menu button').first().click();
    cy.url().should('eq', 'http://127.0.0.1:5500/login');
  });

  it('로그인 화면에서 이메일, 비밀번호를 작성후 확인을 누르면, 홈 라우터로 이동되고 로그인 되었습니다 문구가 보인다', () => {
    cy.get('#email').type('test99@test.com');
    cy.get('#password').type('test99');
    cy.get('.input-submit').click();
    cy.url().should('eq', 'http://127.0.0.1:5500/');
    cy.get('.snackbar')
      .should('have.class', 'show')
      .and('have.text', '로그인 되었습니다 !');
    cy.wait(2000);
    cy.get('.snackbar').should('not.have.class', 'show');
  });

  it('홈 라우터에 버튼이 6개 존재해야한다', () => {
    cy.get('.menu button').should('have.length', 6);
  });

  it('로그아웃 버튼을 누르면 메뉴 버튼이 한개만 보이고, 로그아웃 되었습니다 문구가 보인다', () => {
    cy.get('.menu button').last().click();
    cy.url().should('eq', 'http://127.0.0.1:5500/');
    cy.get('.snackbar')
      .should('have.class', 'show')
      .and('have.text', '로그아웃 되었습니다 !');
    cy.wait(2000);
    cy.get('.snackbar').should('not.have.class', 'show');
  });
});
