describe('subway', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('이메일과 비밀번호를 입력하여 로그인한다.', () => {
    cy.intercept({ url: 'http://15.164.230.130:8080/login' }).as('login');
    cy.get('.js-header__link[href="/login"]').click();

    cy.get('#email').type('imtjsqls@naver.com');
    cy.get('#password').type('qwer1234');

    cy.get('button[name="submit"]').click();
    cy.wait('@login');

    // TODO: Response Token이 들어오는지, Logout 버튼이 생기는지 확인
  });
});
