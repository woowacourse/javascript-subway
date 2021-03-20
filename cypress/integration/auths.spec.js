import { ROUTES, API_ENDPOINT, AUTH_MESSAGES } from '../../src/js/constants/index.js';

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
          request.reply({ statusCode: 422 });
          return;
        }

        request.reply({ statusCode: 200 });
      }
    ).as('checkValidation');

    cy.intercept(
      {
        method: 'POST',
        url: `${API_ENDPOINT.SIGN_UP}`,
        query: { name: '/.+/', email: /.+/, password: '/.+/' },
      },
      (request) => {
        const { email } = request.queryStringParameters;

        if (oldUser.email === email) {
          request.reply({ statusCode: 500 });
          return;
        }

        request.reply({ statusCode: 200 });
      }
    ).as('signUp');
  });

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
    cy.wait('@checkValidation');

    cy.get('#email-check-message').should('have.text', AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED);
  });

  it('회원가입시 중복되지 않은 이메일을 입력했을 때 사용가능 메세지가 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').type(newUser.name);
    cy.get('#email').type(newUser.email);
    cy.wait('@checkValidation');

    cy.get('#email-check-message').should('have.text', AUTH_MESSAGES.USER_EMAIL_IS_VALID);
  });

  it('회원가입시 중복되지 않은 이메일을 입력했을 때 사용가능 메세지가 표시된다.', () => {
    goToSignUpPage();
    cy.get('#name').type(newUser.name);
    cy.get('#email').type(newUser.email);
    cy.get('#password').type(newUser.password);
    cy.get('#submit').type('{enter}');
    cy.wait('@signUp').its('response.statusCode').should('eq', 200);

    cy.get('#confirm-message').should('have.text', AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
  });
});
