describe('Subway test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const userToken = '';

  // it('로그인을 하지않은 유저는 로그인 페이지에서 시작해야한다.', () => {
  //   if (!userToken) {
  //     cy.get('#login-form').should('be.exist');
  //   }
  // });

  // it('회원가입을 클릭 시, 회원가입 페이지로 이동한다.', () => {
  //   cy.get('#signup').click();
  //   cy.url().should('include', '/signup');
  //   cy.get('form[name=signup]').should('be.exist');
  // });

  // it('회원가입 시, 이메일이 중복이면 에러 메세지를 출력한다.', () => {
  //   cy.get('#email').type('tyche123@woowa.com');
  //   cy.get('#check-duplicated-email-button').click();
  //   cy.get('#email-form-message').should('have.text', '중복된 이메일입니다.');
  // });

  // it('회원가입 시, 이름에 공백이 포함되면 에러 메세지를 출력한다.', () => {
  //   cy.get('#name').type('ella tyche');
  //   cy.get('#name-fail-message').should('have.text', '공백을 제거해 주세요.');
  // });

  // it('회원가입 시, 비밀번호가 숫자와 영문자를 포함한 9자 ~ 15자가 아니면 에러 메세지를 출력한다.', () => {
  //   cy.get('#password').type('12345678');
  //   cy.get('#password-fail-message').should(
  //     'have.text',
  //     '알맞은 비밀번호 형식을 입력해 주세요.'
  //   );
  // });

  // it('회원가입 시, 비밀번호와 비밀번호 확인이 같지 않다면 에러 메세지를 출력한다.', () => {
  //   cy.get('#password').clear();
  //   cy.get('#password').type('1234qwersdsad');
  //   cy.get('#password-confirm').type('qwerasdf');
  //   cy.get('#password-confirm-fail-message').should(
  //     'have.text',
  //     '동일한 비밀번호를 입력해 주세요.'
  //   );
  // });

  // it('로그인 버튼을 누르면, 로그인 페이지로 이동한다.', () => {
  //   cy.get('#login').click();
  //   cy.url().should('include', '/');
  //   cy.get('#login-form').should('be.exist');
  // });

  it('유저는 로그인을 하면, 메인 페이지로 이동한다.', () => {
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

  it('유저가 역 관리를 클릭하면, 역 관리 페이지로 이동한다.', () => {
    cy.wait(2000);
    cy.get("button[data-nav-path='/stations']").click();
    cy.url().should('include', '/stations');
  });

  it('유저가 노선 관리를 클릭하면, 노선 관리 페이지로 이동한다.', () => {
    cy.wait(2000);
    cy.get("[data-nav-path='/lines']").click();
    cy.url().should('include', '/lines');
  });

  it('유저가 구간 관리를 클릭하면, 구간 페이지로 이동한다.', () => {
    cy.get("[data-nav-path='/sections']").click();
    cy.url().should('include', '/sections');
  });

  it('로그아웃 버튼 클릭 시, 로그인 페이지로 이동한다.', () => {
    cy.wait(2000);
    cy.get('#logout-button').click();
    cy.url().should('include', '/');
    cy.get('#login-form').should('be.exist');
  });
});
