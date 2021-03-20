describe('지하철 노선도 로그인 및 회원가입 테스트', () => {
  const requestURL = 'http://15.164.230.130:8080';

  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('회원 가입 시 중복된 이메일이 존재하면, 경고 문구를 표시한다.', () => {
    cy.intercept(
      'GET',
      `${requestURL}/members/check-validation?email=sunny_login%40email.com`
    ).as('checkDuplicate');

    cy.get('#login-nav-button').click();
    cy.get('#signup').click();

    cy.get('#email').type('sunny_login@email.com');
    cy.get('#duplicate-check-btn').click();
    cy.wait('@checkDuplicate');

    cy.get('#email-input-error')
      .should('be.visible')
      .and('have.text', '중복된 이메일이 존재합니다.');
  });

  it('회원 가입 시 입력한 비밀번호와 재입력한 비밀번호가 다르면, 경고 문구를 표시한다.', () => {
    cy.get('#login-nav-button').click();
    cy.get('#signup').click();

    cy.get('#email').type('sunny_login@email.com');
    cy.get('#name').type('sunny');
    cy.get('#password').type('sunny_password');
    cy.get('#password-confirm').type('sunny_pass');

    cy.get('#password-confirm-error')
      .should('be.visible')
      .and('have.text', '비밀번호가 일치하지 않습니다.');

    cy.get('#password-confirm').type('word');
    cy.get('#password-confirm-correct')
      .should('be.visible')
      .and('have.text', '비밀번호가 일치합니다.');
  });

  it.only('로그인에 실패했을 시 안내 문구를 표시한다.', () => {
    cy.intercept('POST', `${requestURL}/login/token`).as('login');

    cy.get('#login-nav-button').click();

    cy.get('#email').type('zig10@email.com');
    cy.get('#password').type('123merong');

    cy.get('#login-submit').click();
    cy.wait('@login');

    cy.get('#login-error-warning')
      .should('be.visible')
      .and('have.text', '아이디, 패스워드를 확인하세요.');
  });
});
