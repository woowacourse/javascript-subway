describe('subway', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const interceptRequest = (url) => {
    cy.intercept({
      url,
    }).as('request');
  };

  it('이메일과 비밀번호를 입력하여 로그인한다.', () => {
    cy.get('.js-header__link[href="/login"]').click();

    cy.get('#email').type('imtjsqls@naver.com');
    cy.get('#password').type('qwer1234');

    cy.get('button[name="submit"]').click();

    interceptRequest();

    cy.wait('@request');

    // TODO: 로그인 후 행동 추가
  });
});
