import {
  ERROR_MESSAGE,
  CONFIRM_MESSAGE,
} from "../../src/js/constants/messages.js";
import { END_POINT } from "../constants/general.js";
import { PAGE_URLS, PAGE_KEYS } from "../../src/js/constants/pages.js";

describe("역 관리 페이지", () => {
  before(() => {
    cy.visit("http://127.0.0.1:8080/");

    sessionStorage.clear();

    cy.intercept("POST", `${END_POINT}/login/token`).as("login");
    cy.login();
    cy.wait("@login");
  });

  it("로그인 후 역 관리 페이지로 이동한다.", () => {
    // TODO: 추후 메인 페이지가 전체보기로 변경되면 역 관리 버튼을 누르는 코드를 추가해야 함
    cy.url().should("include", `${PAGE_URLS[PAGE_KEYS.STATIONS]}`);
  });

  it("2자 미만의 역 이름을 입력한 경우 역을 추가할 수 없다.", () => {
    cy.get(".js-station-name").first().type("브").type("{enter}");
    cy.get(".js-station-list").children().should("have.length", 0);
  });

  it("20자 초과의 역 이름을 입력할 수 없다..", () => {
    cy.get(".js-station-name").first().clear().type("브".repeat(30));
    cy.get(".js-station-name").should("have.value", "브".repeat(20));
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

      cy.wait("@stations").then(() => {
        cy.get(".js-station-list > li:last-child > span").should(
          "have.text",
          stationName
        );
      });
    });
  });

  it("중복된 지하철 역을 등록하면 스낵바 메세지를 보여주고, 역 목록에서 해당 역의 배경색을 변경하여 표시한다.", () => {
    cy.intercept("POST", `${END_POINT}/stations`).as("stations");
    cy.get(".js-station-name")
      .first()
      .clear()
      .type(STATION_NAME[0])
      .type("{enter}");

    cy.wait("@stations").then(() => {
      cy.get(".js-snackbar").should(
        "have.text",
        ERROR_MESSAGE.DUPLICATED_STATION
      );
      cy.get(".js-station-list > li:first-child").should(
        "have.class",
        "blink-red"
      );
    });
  });

  it("지하철 역 수정 버튼을 클릭하면 수정 모달이 나타난다.", () => {
    cy.get(".js-station-list > li:last-child > .js-modify-btn").click();
    cy.get(".js-modal").should("be.visible");
  });

  it("수정할 역 이름이 2자 미만인 경우 수정할 수 없다.", () => {
    cy.get(".js-modify-station-name")
      .first()
      .clear()
      .type("썬")
      .type("{enter}");
    cy.get(".js-station-list > li:last-child > span").should(
      "not.have.text",
      "썬"
    );
  });

  it("수정할 역 이름이 20자 초과인 경우 수정할 수 없다.", () => {
    cy.get(".js-modify-station-name").first().clear().type("썬".repeat(30));
    cy.get(".js-modify-station-name").should("have.value", "썬".repeat(20));
  });

  it("수정할 역 이름이 기존에 존재하는 역 이름과 중복되는 경우 하단에 안내 메세지를 보여준다.", () => {
    cy.get(".js-modify-station-name")
      .first()
      .clear()
      .type(STATION_NAME[0])
      .type("{enter}");
    cy.get(".js-modify-station-message")
      .should("be.visible")
      .should("have.text", ERROR_MESSAGE.STATIONS.DUPLICATED_STATION);
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
    const stub = cy.stub();
    cy.on("window:confirm", stub);

    cy.get(".js-station-list > li:last-child > .js-delete-btn")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          CONFIRM_MESSAGE.DELETE_STATION
        );
      });

    cy.get(".js-station-list > li:last-child > span").should(
      "not.have.text",
      modifiedStationName
    );
  });

  after(() => {
    cy.get(".js-station-list .js-delete-btn").each(($deleteBtn) => {
      cy.wrap($deleteBtn).click();
    });
  });
});
