const { PATH, ELEMENT } = require('../../src/js/utils/constants');

describe('Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('메인 페이지에서 각 메뉴 버튼을 클릭하면, 해당 메뉴가 메인 화면에 렌더링된다.', () => {
    const titles = ['역 관리', '노선 관리', '구간 관리'];
    const urlList = [PATH.STATIONS, PATH.LINES, PATH.SECTIONS];

    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.get(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`).type('abcd@naver.com');
    cy.get(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`).type('12341234');
    cy.get(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`).click();

    cy.get(`.${ELEMENT.NAV_BAR}`)
      .children()
      .each(($el, i) => {
        // 현재는 전체보기, 길찾기가 구현되어 있지 않아서 if문으로 미리 종료시켰음
        if (i >= titles.length) return;
        cy.wrap($el).click();
        cy.get('main h2').contains(titles[i]);
        cy.url().should('include', urlList[i]);
      });

    cy.get(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`).click();
    cy.url().should('eq', 'http://localhost:8080/');
  });
});
