describe('Youtube classroom test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  const userToken = '';

  it('로그인을 안한 유저는 로그인 페이지를 본다.', () => {
    if (!userToken) {
      cy.get('form[name=login]').should('be.exist');
    }
  });

  it('회원가입을 클릭하면, 회원가입 페이지로 넘어간다.', () => {
    cy.get('#signup').click();
    cy.get('form[name=signup]').should('be.exist');
  });

  it('회원 가입 시, 비밀번호와 비밀번호 확인이 같지 않다면 확인 버튼은 활성화 되지 않는다.', () => {
    cy.get('#email').type('ella@woowahan.com');
    cy.get('#name').type('ella');
    cy.get('#password').type('1234qwer');
    cy.get('#password-confirm').type('qwerasdf');
    cy.get('#signup-button').should('be.disabled');
  });

  it('회원 가입 시, 비밀번호와 비밀번호 확인이 같지 않다면 확인 버튼은 활성화 되지 않는다.', () => {
    cy.get('#password-confirm').clear();
    cy.get('#password-confirm').type('1234qwer');
    cy.get('#signup-button').should('not.be.disabled');
  });
});
