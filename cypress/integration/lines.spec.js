import { ERROR_MESSAGE } from "../../src/js/constants/messages.js";
import { PAGE_URLS, PAGE_KEYS } from "../../src/js/constants/pages.js";
import { END_POINT } from "../constants/general.js";

describe("역 관리 페이지", () => {
  const stations = ["배민역", "쿠팡역", "카카오역"];
  const line = {
    name: "4호선",
    upStation: stations[0],
    downStation: stations[1],
    distance: 10,
    duration: 5,
    color: "bg-red-300",
  };

  before(() => {
    cy.visit("http://127.0.0.1:8080/");

    sessionStorage.clear();

    cy.intercept("POST", "/login/token").as("login");
    cy.login();
    cy.wait("@login").then(() => {
      stations.forEach((stationName) => {
        cy.get(".js-station-name")
          .first()
          .clear()
          .type(stationName)
          .type("{enter}");
      });
    });
  });

  it("로그인 후 지하철 노선 관리 페이지로 이동한다.", () => {
    cy.intercept("GET", "/lines").as("visitLines");
    cy.get(`.js-page-link[href="${PAGE_URLS[PAGE_KEYS.LINES]}"]`).click();
    cy.url().should("include", `${PAGE_URLS[PAGE_KEYS.LINES]}`);
    cy.wait("@visitLines");
  });

  it("노선 추가 버튼을 누르면 새로운 지하철 노선을 추가할 수 있는 모달이 나타난다.", () => {
    cy.get(".js-add-line-btn").click();
    cy.get(".js-modal").should("have.class", "open");
  });

  it("2자 미만의 지하철 노선 이름을 입력한 경우 노선을 추가할 수 없다.", () => {
    cy.addLine({ ...line, name: "브" });
    cy.get(".js-line-list-item").should("have.length", 0);
  });

  it("10자 초과의 지하철 노선 이름을 입력할 수 없다..", () => {
    cy.get("[name='subway-line-name']").clear().type("브".repeat(20));
    cy.get("input[name='subway-line-name']").should(
      "have.value",
      "브".repeat(10)
    );
  });

  it("노선을 등록하면 지하철 노선 목록에 추가된다.", () => {
    cy.intercept("POST", "/lines").as("addLine");
    cy.addLine(line);
    cy.wait("@addLine");

    cy.get(".js-modal").should("not.have.class", "open");
    cy.get(".js-line-list .js-line-name:last-child").should(
      "have.text",
      line.name
    );
  });

  it("지하철 노선을 클릭하면 상행역, 하행역, 거리, 시간을 확인할 수 있다.", () => {
    cy.get(".js-line-list > li").first().click();
    cy.get(".js-line-info").first().should("be.visible");
  });

  it("중복된 지하철 노선을 등록할 수 없다.", () => {
    cy.addLine(line);
    cy.get(".js-add-line-message").should(
      "have.text",
      ERROR_MESSAGE.LINES.DUPLICATED_LINE
    );
  });

  it("지하철 노선의 수정 버튼을 클릭하면 수정 모달이 나타난다.", () => {
    cy.get(".js-modify-line-btn").first().click();
    cy.get(".js-modal").should("be.visible");
  });

  it("지하철 노선을 수정하면 지하철 역 목록에 반영된다.", () => {
    const newStationData = {
      name: "브로콜리콜리콜리역",
      color: "bg-blue-300",
    };

    cy.get("#subway-line-name").type(newStationData.name);
    cy.get(`input[data-color="${newStationData.color}"]`).click();
    cy.get("form button[name='submit']").click();
    cy.get(".modal").should("not.be.visible");

    cy.get(".js-line-list-item .js-line-color-dot")
      .first()
      .should("have.class", newStationData.color);
    cy.get(".js-line-list-item .js-line-name")
      .first()
      .should("have.text", newStationData.name);

    cy.get(".js-line-list-item")
      .first()
      .should("have.attr", "data-line-name", newStationData.name);
    cy.get(".js-line-list-item")
      .first()
      .should("have.attr", "data-line-color", newStationData.color);
  });

  it("삭제 버튼을 누르면 confirm 후 해당 지하철 노선이 삭제된다.", () => {
    const stub = cy.stub();
    cy.on("window:confirm", stub);

    cy.get(".js-line-list > li:last-child > .js-delete-line-btn")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          CONFIRM_MESSAGE.DELETE_STATION
        );
      });

    cy.get(
      ".js-line-list > li:last-child > .subway-line-list-item-name"
    ).should("not.have.text", line.name);
  });

  // after(() => {
  //   cy.get(".js-line-list .js-delete-line-btn").each(($deleteBtn) => {
  //     cy.wrap($deleteBtn).click();
  //   });
  // });
});
