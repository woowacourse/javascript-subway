import { ALERT_MESSAGE, ID_SELECTOR } from '../../src/js/constants';

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const EMAIL = 'wnsah052@naver.com';
  const NAME = '한준모';
  const PASSWORD = '1';

  // TODO: cypress 첫 번째 테스트일 경우 alert를 감지하지 못하는 문제
  it('회원 가입 시 `email`, `name`, `password`를 제출해야한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('nav').find(`[href="/pages/login.html"]`).click();
    cy.get('main').find(`[href="/pages/signup.html"]`).click();

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_EMAIL}`).type(EMAIL);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_NAME}`).type(NAME);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD}`).type(PASSWORD);
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}`).type(PASSWORD);

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL
        );
      });
  });

  it('알맞은 이메일과 비밀번호를 입력해야 로그인할 수 있다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('nav').find(`[href="/pages/login.html"]`).click();

    cy.get(`#${ID_SELECTOR.LOGIN_FORM_EMAIL}`).type(EMAIL);
    cy.get(`#${ID_SELECTOR.LOGIN_FORM_PASSWORD}`).type(PASSWORD);
    cy.get(`#${ID_SELECTOR.LOGIN_FORM_SUBMIT}`)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.LOGIN_SUCCESS);
      });
  });
});
