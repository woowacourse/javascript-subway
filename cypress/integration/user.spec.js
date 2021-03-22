describe('Youtube classroom test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/dist');
  });

  const userToken = '';

  it('로그인을 안한 유저는 로그인 페이지를 본다.', () => {
    if (!userToken) {
      cy.get('#login-form').should('be.exist');
    }
  });

  it('회원가입을 클릭하면, 회원가입 페이지로 넘어간다.', () => {
    cy.get('#signup').click();
    cy.url().should('include', '/signup');
    cy.get('form[name=signup]').should('be.exist');
  });

  it('회원 가입 시, 이메일 중복 체크를 할 수 있다.', () => {
    cy.get('#email').type('tyche123@woowa.com');
    cy.get('#check-duplicated-email-button').click();
    cy.get('#email-fail-message').should('have.text', '중복된 이메일입니다.');
  });

  it('회원 가입 시, 이름에는 공백이 포함될 수 없다.', () => {
    cy.get('#name').type('ella tyche');
    cy.get('#name-fail-message').should('have.text', '공백을 제거해 주세요.');
  });

  it('회원 가입 시, 비밀번호는 숫자와 영문자를 포함한 9자 ~ 15이어야 한다.', () => {
    cy.get('#password').type('12345678');
    cy.get('#password-fail-message').should(
      'have.text',
      '알맞은 비밀번호 형식을 입력해 주세요.'
    );
  });

  it('회원 가입 시, 비밀번호와 비밀번호 확인이 같지 않다면 오류메세지를 보여준다.', () => {
    cy.get('#password').clear();
    cy.get('#password').type('1234qwersdsad');
    cy.get('#password-confirm').type('qwerasdf');
    cy.get('#password-confirm-fail-message').should(
      'have.text',
      '동일한 비밀번호를 입력해 주세요.'
    );
  });

  it('회원 가입 페이지에서 로그인 페이지로 넘어갈 수 있다.', () => {
    cy.get('#login').click();
    cy.url().should('include', '/');
    cy.get('#login-form').should('be.exist');
  });

  it('유저는 로그인을 할 수 있다.', () => {
    cy.get('#email').type('tyche123@woowa.com');
    cy.get('#password').type('12345qwer');
    cy.get('#login-form > div > button').click();

    cy.getCookies()
      .should('have.length', 1)
      .then(cookies => {
        expect(cookies[0]).to.have.property('name', 'jwtToken');
      });

    cy.url().should('include', '/');
    cy.get('#navigation').should('be.exist');
    cy.get('#logout-button').should('be.exist');
  });

  it('유저는 역 관리를 클릭하면 역 관리 페이지로 갈 수 있다.', () => {
    cy.get("[data-nav-path='/stations']").click();
    cy.url().should('include', '/stations');
  });

  it('유저는 노선 관리를 클릭하면 노선 관리 페이지로 갈 수 있다.', () => {
    cy.get("[data-nav-path='/lines']").click();
    cy.url().should('include', '/lines');
  });

  it('유저는 구간 관리를 클릭하면 구간 페이지로 갈 수 있다.', () => {
    cy.get("[data-nav-path='/sections']").click();
    cy.url().should('include', '/sections');
  });

  it('유저는 로그아웃을 할 수있다.', () => {
    cy.get('#logout-button').click();
    cy.url().should('include', '/');
    cy.get('#login-form').should('be.exist');
  });
});
