describe('Browser History Api를 이용하여 SPA처럼 라우팅을 적용한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('메인 페이지에서 각 메뉴 버튼을 클릭하면, 해당 메뉴가 메인 화면에 렌더링된다.', () => {
    const titles = ['역 관리', '노선 관리', '구간 관리', '', '', '로그인', '회원가입'];
    const urlList = ['/stations', '/lines', '/sections', '', '', '/signin', '/signup'];
    const LAST_INDEX = 6;

    cy.get('.nav-bar')
      .children()
      .each(($el, i) => {
        // 전체 보기와 길 찾기는 3단계에서 구현할 예정
        if ($el[0].innerText === '🗺️ 전체 보기') return;
        if ($el[0].innerText === '🔎 길 찾기') return;

        cy.wrap($el).click();
        cy.wait(100);
        cy.get('main h2').contains(titles[i]);
        cy.url().should('include', urlList[i]);
      });

    cy.get('.sign-up-btn').click();
    cy.wait(100);
    cy.get('main h2').contains(titles[LAST_INDEX]);
    cy.url().should('include', urlList[LAST_INDEX]);
  });
});
