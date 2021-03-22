describe("사용자 로그인 및 회원가입", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const FAIL_TOKEN = "s";
  const TEST_EMAIL = "sunccol@test.com";
  const TEST_PW = "1q2w3e4r";

  it("로그인에 실패하면 입력창을 초기화하고 하단에 에러 메시지를 보여준다.", () => {
    cy.get("#email").type(TEST_EMAIL);
    cy.get("#password").type(TEST_PW + FAIL_TOKEN);
    cy.get("#password").type("{enter}");

    cy.get("#email").should("have.value", "");
    cy.get("#password").should("have.value", "");
    cy.get(".js-login-error").first().should("be.visible");
  });

  it("로그인에 성공하면 네비게이션이 활성화 되고 역관리 화면이 나타난다.", () => {
    cy.get("#email").type(TEST_EMAIL);
    cy.get("#password").type(TEST_PW);
    cy.get("#password").type("{enter}");

    cy.get("header > nav").should("be.visible");
    cy.url().should("include", "/stations");
  });

  it("로그아웃 버튼을 누르면 로그인 화면으로 돌아간다.", () => {
    cy.get(".js-logout-btn").click();
    cy.url().should("include", "/login");
  });
});
