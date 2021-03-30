import { ERROR_MESSAGE } from "../../src/js/constants/messages.js";

describe("역 관리 페이지", () => {
  const stations = ["배민역", "쿠팡역", "카카오역"];
  const line = {
    name: "1호선",
    upStation: stations[0],
    downStation: stations[1],
    distance: 7,
    duration: 7,
    color: "bg-red-300",
  };

  before(() => {
    cy.visit("http://127.0.0.1:8080/");

    sessionStorage.clear();

    cy.intercept("POST", `${END_POINT}/login/token`).as("login");
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
    cy.get(`.js-page-link[href="${PAGE_URLS[PAGE_KEYS.LINES]}"]`).click();
    cy.get(".js-add-line-btn").click();
    cy.addLine(line);
  });

  it("구간 관리 페이지로 이동한다.", () => {
    cy.intercept("GET", `${END_POINT}${PAGE_URLS[PAGE_KEYS.SECTIONS]}`).as(
      "visitSections"
    );
    cy.get(`.js-page-link[href="${PAGE_URLS[PAGE_KEYS.SECTIONS]}"]`).click();
    cy.url().should("include", `${PAGE_URLS[PAGE_KEYS.SECTIONS]}`);
    cy.wait("@visitSections");
  });

  it("구간 관리 페이지에서 현재까지 생성된 노선을 조회할 수 있다.", () => {
    cy.get(".js-line-select").should("have.class", line.color);
    cy.get(".js-station-name").each(($stationName, index) => {
      cy.wrap($stationName).should("have.text", stations[index]);
    });
  });

  it("구간 추가 버튼을 누르면 지하철 구간을 추가할 수 있는 모달이 나타난다.", () => {
    cy.get(".js-add-section").click();
    cy.get(".js-modal").should("have.class", "open");
  });

  it("이전역과 다음역 모두 현재 노선안에 있을 경우 구간을 추가할 수 없다.", () => {
    cy.get(".js-prev-station").select(stations[0]);
    cy.get(".js-next-station").select(stations[1]);
    cy.get("#distance").type(3);
    cy.get("#duration").type(3).type("{enter}");

    cy.get(".js-section-modal-error-message").should(
      "have.text",
      ERROR_MESSAGE.DUPLICATED_SECTION
    );
  });

  it("기존 구간의 거리보다 긴 거리를 입력할 경우 구간을 추가할 수 없다.", () => {
    cy.get(".js-prev-station").select(stations[0]);
    cy.get(".js-next-station").select(stations[2]);
    cy.get("#distance").type(line.distance + 1);
    cy.get("#duration")
      .type(line.duration - 1)
      .type("{enter}");

    cy.get(".js-section-modal-error-message").should(
      "have.text",
      ERROR_MESSAGE.INVALID_DISTANCE
    );
  });

  it("기존 구간의 시간보다 긴 시간를 입력할 경우 구간을 추가할 수 없다.", () => {
    cy.get(".js-prev-station").select(stations[0]);
    cy.get(".js-next-station").select(stations[2]);
    cy.get("#distance").type(line.distance - 1);
    cy.get("#duration")
      .type(line.duration + 1)
      .type("{enter}");

    cy.get(".js-section-modal-error-message").should(
      "have.text",
      ERROR_MESSAGE.INVALID_DURATION
    );
  });

  it("구간을 추가하면 노선에 새로운 역이 추가된다.", () => {
    cy.get(".js-prev-station").select(stations[1]);
    cy.get(".js-next-station").select(stations[2]);
    cy.get("#distance").type(line.distance - 1);
    cy.get("#duration")
      .type(line.duration - 1)
      .type("{enter}");

    cy.get(".js-modal").should("not.have.class", "open");
    cy.get(".js-station-name").each(($stationName, index) => {
      cy.wrap($stationName).should("have.text", stations[index]);
    });
  });
});
