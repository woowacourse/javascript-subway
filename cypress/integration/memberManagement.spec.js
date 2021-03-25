import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "../../src/js/constants/messages.js";
import {
  TEST_EMAIL,
  TEST_PW,
  FAIL_TOKEN,
  END_POINT,
} from "../constants/general.js";

describe("사용자 로그인 및 회원가입", () => {
  before(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("로그인에 실패하면 입력창을 초기화하고 하단에 에러 메시지를 보여준다.", () => {
    cy.intercept("POST", `${END_POINT}/login/token`).as("login");

    cy.get("#email").type(TEST_EMAIL);
    cy.get("#password").type(TEST_PW + FAIL_TOKEN);
    cy.get("#password").type("{enter}");

    cy.wait("@login");

    cy.get("#email").should("have.value", "");
    cy.get("#password").should("have.value", "");
    cy.get(".js-login-error").first().should("be.visible");
  });

  it("로그인에 성공하면 네비게이션이 활성화 되고 역관리 화면이 나타난다.", () => {
    cy.intercept("POST", `${END_POINT}/login/token`).as("login");

    cy.get("#email").clear().type(TEST_EMAIL);
    cy.get("#password").clear().type(TEST_PW);
    cy.get("#password").type("{enter}");

    cy.wait("@login");

    cy.get("header > nav").should("be.visible");
    cy.url().should("include", "/stations");
  });

  it("로그아웃 버튼을 누르면 로그인 화면으로 돌아간다.", () => {
    cy.get(".js-logout-btn").click();
    cy.url().should("include", "/login");
  });

  it("로그인 페이지에서 회원가입 버튼을 누르면 회원가입 페이지로 이동한다.", () => {
    cy.get(".js-signup-link").first().click();
    cy.url().should("include", "/signup");
  });

  it("회원가입 폼에서 이메일 형식을 지키지 않으면 해당 오류 메세지를 보여준다.", () => {
    cy.get("#email").type("abc").blur();
    cy.get(".js-check-email-message").should(
      "have.text",
      ERROR_MESSAGE.INVALID_EMAIL_FORM
    );
  });

  it("회원가입 폼에서 이미 존재하는 이메일을 입력하면 해당 오류 메세지를 보여준다.", () => {
    cy.get("#email").clear().type(TEST_EMAIL).blur();
    cy.get(".js-check-email-message").should(
      "have.text",
      ERROR_MESSAGE.DUPLICATED_EMAIL
    );
  });

  it("회원가입 폼에서 사용 가능한 이메일 주소를 입력하면 사용가능 메세지를 보여준다.", () => {
    cy.get("#email")
      .clear()
      .type(TEST_EMAIL + "success")
      .blur();
    cy.get(".js-check-email-message").should(
      "have.text",
      SUCCESS_MESSAGE.VALID_EMAIL
    );
  });

  it("회원가입 폼에서 비밀번호와 비밀번호 확인이 서로 다를 경우 해당 오류 메세지를 보여준다.", () => {
    cy.get("#password").type(TEST_PW);
    cy.get("#password-confirm").type(TEST_PW + FAIL_TOKEN);
    cy.get(".js-pw-confirm-message").should(
      "have.text",
      ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE
    );

    cy.get("#password-confirm").clear().type(TEST_PW);
    cy.get("#password")
      .clear()
      .type(TEST_PW + FAIL_TOKEN);
    cy.get(".js-pw-confirm-message").should(
      "have.text",
      ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE
    );
  });

  it("회원가입 폼에서 비밀번호와 비밀번호 확인이 서로 일치할 경우 비밀번호 확인 완료 메세지를 보여준다.", () => {
    cy.get("#password").clear().type(TEST_PW);
    cy.get("#password-confirm").clear().type(TEST_PW);
    cy.get(".js-pw-confirm-message").should(
      "have.text",
      SUCCESS_MESSAGE.PASSWORD_CONFIRM_SUCCESS
    );

    cy.get("#password-confirm").clear().type(TEST_PW);
    cy.get("#password").clear().type(TEST_PW);
    cy.get(".js-pw-confirm-message").should(
      "have.text",
      SUCCESS_MESSAGE.PASSWORD_CONFIRM_SUCCESS
    );
  });

  it("회원가입 페이지에서 로그인 버튼을 누르면 로그인 페이지로 이동한다.", () => {
    cy.get(".js-login-link").click();
    cy.url().should("include", "/login");
  });
});
