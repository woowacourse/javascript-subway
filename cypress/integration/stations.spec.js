import { ERROR_MESSAGE } from "../../src/js/constants/messages.js";
import { TEST_EMAIL, TEST_PW, END_POINT } from "../constants/general.js";

describe("역 관리 페이지", () => {
  before(() => {
    cy.visit("http://127.0.0.1:8080/");

    cy.intercept("POST", `${END_POINT}/login/token`).as("login");
    cy.get("#email").clear().type(TEST_EMAIL);
    cy.get("#password").clear().type(TEST_PW);
    cy.get("#password").type("{enter}");
    cy.wait("@login");
  });

  it("로그인 후 역 관리 페이지로 이동한다.", () => {
    // TODO: 추후 메인 페이지가 전체보기로 변경되면 역 관리 버튼을 누르는 코드를 추가해야 함
    cy.url().should("include", "/stations");
  });

  it("2자 미만의 역 이름을 입력한 경우 역을 추가할 수 없다.", () => {
    cy.get(".js-station-name").first().type("브").type("{enter}");
    cy.get(".js-station-name:invalid").should("have.length", 1);
  });

  it("20자 초과의 역 이름을 입력한 경우 역을 추가할 수 없다.", () => {
    cy.get(".js-station-name")
      .first()
      .clear()
      .type("브".repeat(21))
      .type("{enter}");
    cy.get(".js-station-name:invalid").should("have.length", 1);
  });

  const STATION_NAME = ["비피더스역", "쿠팡역"];

  it("지하철 역을 등록하면 지하철 역 목록에 추가된다.", () => {
    STATION_NAME.forEach((stationName) => {
      cy.intercept("POST", `${END_POINT}/stations`).as("stations");
      cy.get(".js-station-name")
        .first()
        .clear()
        .type(stationName)
        .type("{enter}");

      cy.wait("@stations");

      cy.get(".js-station-list > li:last-child > span").should(
        "have.text",
        stationName
      );
    });
  });

  it("중복된 지하철 역을 등록하면 스낵바 메세지를 보여주고, 역 목록에서 해당 역의 배경색을 변경하여 표시한다.", () => {
    cy.intercept("POST", `${END_POINT}/stations`).as("stations");
    cy.get(".js-station-name")
      .first()
      .clear()
      .type(STATION_NAME[0])
      .type("{enter}");

    cy.wait("@stations");

    cy.get(".js-snackbar").should(
      "have.text",
      ERROR_MESSAGE.DUPLICATED_STATION
    );
    cy.get(".js-station-list > li:first-child > span").should(
      "have.class",
      "bg-red-200"
    );
  });

  it("지하철 역 수정 버튼을 클릭하면 수정 모달이 나타난다.", () => {
    cy.get(".js-station-list > li:last-child > .js-modify-btn").click();
    cy.get(".js-modal").should("be.visible");
  });

  it("수정할 역 이름이 2자 미만인 경우 수정할 수 없다.", () => {
    cy.get(".js-modify-station-name").first().type("썬").type("{enter}");
    cy.get(".js-modify-station-name:invalid").should("have.length", 1);
  });

  it("수정할 역 이름이 20자 초과인 경우 수정할 수 없다.", () => {
    cy.get(".js-modify-station-name")
      .first()
      .clear()
      .type("썬".repeat(21))
      .type("{enter}");
    cy.get(".js-modify-station-name:invalid").should("have.length", 1);
  });

  it("수정할 역 이름이 기존에 존재하는 역 이름과 중복되는 경우 하단에 안내 메세지를 보여준다.", () => {
    cy.get(".js-modify-station-name")
      .first()
      .clear()
      .type(STATION_NAME[0])
      .type("{enter}");
    cy.get(".js-duplicated-station-message")
      .should("be.visible")
      .should("have.text", ERROR_MESSAGE.DUPLICATED_STATION);
  });

  const modifiedStationName = "우아한썬콜역";
  it("수정할 역 이름을 등록하면 모달이 사라지고, 수정된 이름이 반영된다.", () => {
    cy.get(".js-modify-station-name")
      .first()
      .clear()
      .type(modifiedStationName)
      .type("{enter}");
    cy.get(".js-modal").should("not.be.visible");
    cy.get(".js-station-list > li:last-child > span").should(
      "have.text",
      modifiedStationName
    );
  });

  it("삭제버튼을 누르면 confirm 후 해당 지하철 역이 삭제된다.", () => {
    cy.get(".js-station-list > li:last-child > .js-delete-btn").click();
    cy.get(".js-confirm-modal").should("be.visible");
    cy.get(".js-confirm-btn").click();
    cy.get(".js-confirm-modal").should("not.be.visible");
    cy.get(".js-station-list > li:last-child > span").should(
      "not.have.text",
      modifiedStationName
    );
  });

  after(() => {
    cy.get(".js-station-list .js-delete-btn").each(($deleteBtn) => {
      cy.wrap($deleteBtn).click();
      cy.get(".js-confirm-btn").click();
    });
  });
});
