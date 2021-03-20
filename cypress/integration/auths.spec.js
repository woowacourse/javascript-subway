import { ROUTES, API_ENDPOINT, AUTH_MESSAGES, STATUS_CODE } from '../../src/js/constants/index.js';

describe('회원가입 및 로그인 테스트', () => {
  const oldUser = {
    name: '하루',
    email: '365kim@gmail.com',
    password: '365',
  };
  const newUser = {
    name: '동동',
    email: 'bigsaigon333@gmail.com',
    password: '333',
  };

  beforeEach(() => {
    cy.visit('/');

    cy.intercept(
      {
        method: 'GET',
        url: `${API_ENDPOINT.EMAIL_VALIDATION}`,
        query: { email: /.+/ },
      },
      (request) => {
        const { email } = request.queryStringParameters;

        if (oldUser.email === email) {
          request.reply({ statusCode: STATUS_CODE.EMAIL_VALIDATION.DUPLICATED });
          return;
        }

        request.reply({ statusCode: STATUS_CODE.EMAIL_VALIDATION.OK });
      }
    ).as('checkValidation');

    cy.intercept(
      {
        method: 'POST',
        url: `${API_ENDPOINT.SIGN_UP}`,
        query: { name: /.+/, email: /.+/, password: /.+/ },
      },
      (request) => {
        const { email } = request.queryStringParameters;

        if (oldUser.email === email) {
          request.reply({ statusCode: STATUS_CODE.SIGN_UP.EMAIL_DUPLICATED });
          return;
        }

        request.reply({ statusCode: STATUS_CODE.SIGN_UP.OK });
      }
    ).as('signUp');

    cy.intercept(
      {
        method: 'POST',
        url: `${API_ENDPOINT.LOGIN}`,
        query: { email: /.+/, password: /.+/ },
      },
      (request) => {
        const { email, password } = request.queryStringParameters;

        if (oldUser.email === email && oldUser.password === password) {
          request.reply({ statusCode: STATUS_CODE.LOGIN.FAILED });
          return;
        }

        request.reply({ statusCode: STATUS_CODE.LOGIN.OK });
      }
    ).as('login');
  });

  const goToLoginPage = () => {
    cy.get(`a[href="${ROUTES.LOGIN}"]`).click();
  };

  const goToSignUpPage = () => {
    cy.get(`a[href="${ROUTES.LOGIN}"]`).click();
    cy.get(`a[href="${ROUTES.SIGN_UP}"]`).click();
  };

  it('회원가입시 사용자 이름을 입력하지 않았을 때 체크메세지가 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').focus().blur();

    cy.get('#name-check-message').should('have.text', AUTH_MESSAGES.USER_NAME_IS_REQUIRED);
  });

  it('회원가입시 중복된 이메일을 입력했을 때 사용불가 메세지가 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').type(oldUser.name);
    cy.get('#email').type(oldUser.email);
    cy.wait('@checkValidation').its('response.statusCode').should('not.eq', STATUS_CODE.EMAIL_VALIDATION.OK);

    cy.get('#email-check-message').should('have.text', AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED);
  });

  it('회원가입시 중복되지 않은 이메일을 입력했을 때 사용가능 메세지가 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').type(newUser.name);
    cy.get('#email').type(newUser.email);
    cy.wait('@checkValidation').its('response.statusCode').should('eq', STATUS_CODE.EMAIL_VALIDATION.OK);

    cy.get('#email-check-message').should('have.text', AUTH_MESSAGES.USER_EMAIL_IS_VALID);
  });

  it('회원가입시 모든 정보를 바르게 입력한 경우 회원가입이 정상적으로 처리되고 회원가입 성공 메세지가 표시된다.', () => {
    goToSignUpPage();

    cy.get('#submit').should('be.disabled');

    cy.get('#name').type(newUser.name);
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.password);

    cy.get('#submit').should('not.be.disabled');

    cy.get('#submit').type('{enter}');
    cy.wait('@signUp').its('response.statusCode').should('eq', STATUS_CODE.EMAIL_VALIDATION.OK);

    cy.get('#confirm-message').should('have.text', AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
  });

  it('로그인에 실패했을 때 로그인 실패 메세지가 표시된다.', () => {
    goToLoginPage();
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.password);
    cy.get('#submit').type('{enter}');

    cy.wait('@login').its('response.statusCode').should('not.eq', STATUS_CODE.LOGIN.OK);
    cy.get('#snackbar').should('have.text', AUTH_MESSAGES.LOGIN_HAS_BEEN_FAILED);
  });

  it('로그인에 성공했을 때 로그인 성공 메세지가 표시된다.', () => {
    goToLoginPage();

    cy.get('#submit').should('be.disabled');

    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);

    cy.get('#submit').should('not.be.disabled');

    cy.get('#submit').type('{enter}');

    cy.wait('@login').its('response.statusCode').should('eq', STATUS_CODE.LOGIN.OK);
    cy.get('#snackbar').should('have.text', AUTH_MESSAGES.LOGIN_HAS_BEEN_COMPLETED);
  });
});
