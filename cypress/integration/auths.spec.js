import { API_ENDPOINT, STATUS_CODE } from '../../src/js/constants/api.js';
import PATHNAMES from '../../src/js/constants/rawPathnames.js';

describe('회원가입 및 로그인 테스트', () => {
  const oldUser = {
    name: '하루',
    email: '1@1',
    password: '365',
  };
  const newUser = {
    name: '동동',
    email: '9@9',
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
        const url = new URL(request.url);
        const parameters = new URLSearchParams(url.search);
        const email = parameters.get('email');

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
      },
      (request) => {
        const { email } = request.body;

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
      },
      (request) => {
        const { email, password } = request.body;

        if (oldUser.email === email && oldUser.password === password) {
          request.reply({ statusCode: STATUS_CODE.LOGIN.OK });
          return;
        }

        request.reply({ statusCode: STATUS_CODE.LOGIN.FAILED });
      }
    ).as('login');
  });

  const goToLoginPage = () => {
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
  };

  const goToSignUpPage = () => {
    cy.get(`a[href*="${PATHNAMES.LOGIN}"]`).click();
    cy.get(`a[href*="${PATHNAMES.SIGN_UP}"]`).click();
  };

  it('회원가입시 중복된 이메일을 입력했을 때 유효하지 않은 입력으로 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').type(oldUser.name);
    cy.get('#email').type(oldUser.email, { delay: 1500 });
    cy.wait('@checkValidation').its('response.statusCode').should('not.eq', STATUS_CODE.EMAIL_VALIDATION.OK);

    cy.get('#email:invalid').should('exist');
  });

  it('회원가입시 모든 정보를 바르게 입력한 경우 회원가입이 정상적으로 처리된다.', () => {
    goToSignUpPage();

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#name').type(newUser.name);
    cy.get('#email').type(newUser.email, { delay: 1500 });

    cy.wait('@checkValidation').its('response.statusCode').should('eq', STATUS_CODE.EMAIL_VALIDATION.OK);

    cy.get('#password').type(newUser.password);

    cy.get('button[type="submit"]').should('not.be.disabled');

    cy.get('button[type="submit"]').click();
    cy.wait('@signUp').its('response.statusCode').should('eq', STATUS_CODE.SIGN_UP.OK);
  });

  it('유효하지 않은 이메일과 비밀번호를 입력하면 로그인에 실패한다.', () => {
    goToLoginPage();
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.password);
    cy.get('button[type="submit"]').click();

    cy.wait('@login').its('response.statusCode').should('not.eq', STATUS_CODE.LOGIN.OK);
  });

  it('유효한 이메일과 비밀번호를 입력하면 로그인에 성공한다', () => {
    goToLoginPage();

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#email').type(oldUser.email);
    cy.get('#password').type(oldUser.password);

    cy.get('button[type="submit"]').should('not.be.disabled');

    cy.get('button[type="submit"]').click();

    cy.wait('@login').its('response.statusCode').should('eq', STATUS_CODE.LOGIN.OK);
  });
});
