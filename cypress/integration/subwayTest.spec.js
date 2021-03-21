import { ID_SELECTOR } from "../../src/js/constants";

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/')
  })

  it('회원 가입 시 `email`, `name`, `password`를 제출해야한다.', () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get('nav').find(`[href="/pages/login.html"]`).click();
    cy.get('main').find(`[href="/pages/signup.html"]`).click();

    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_EMAIL}`).type('tpwls0308@naver.com');
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_NAME}`).type('zz');
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD}`).type('1');
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM}`).type('1');
    cy.get(`#${ID_SELECTOR.SIGNUP_FORM_SUBMIT}`).click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('중복된 이메일이 있습니다.');
    });
  })
});
