describe('지하철 노선도 테스트', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('navigation 탭을 클릭했을 때, 해당 URL로 이동하는지 확인한다.', () => {
    ['stations', 'lines', 'sections', 'map', 'search', 'login'].forEach(
      (button) => {
        cy.get(`.js-navigation__${button}`).click();
        cy.url().contains(button);
      },
    );
  });
});
