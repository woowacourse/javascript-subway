import { COLORS } from '../../src/js/utils/mock';
import { login } from '../support/auth';
import { addLine, editLine, deleteLine } from '../support/line';
import { lineListItemSelector } from '../support/selector';

describe('지하철 노선 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login();
  });

  it('지하철 노선을 등록할 수 있다.', () => {
    cy.get('#lines-nav-link').click();

    addLine({
      name: '로이드호선호',
      upStation: '고려대',
      downStation: '연세대',
      duration: 10,
      distance: 10,
      color: COLORS.GRAY[300],
    });

    cy.get(lineListItemSelector('로이드호선호')).should('exist');
    cy.get(`${lineListItemSelector('로이드호선호')} .subway-line-color-dot.${COLORS.GRAY[300]}`).should('exist');
    cy.get(`${lineListItemSelector('로이드호선호')} .js-line-name`).should('have.text', '로이드호선호');
  });

  it('지하철 노선을 수정할 수 있다.', () => {
    editLine({ targetName: '로이드호선호', name: '로이드포코', color: COLORS.PURPLE[300] });

    cy.get(lineListItemSelector('로이드포코')).should('exist');
    cy.get(`${lineListItemSelector('로이드포코')} .subway-line-color-dot.${COLORS.PURPLE[300]}`).should('exist');
    cy.get(`${lineListItemSelector('로이드포코')} .js-line-name`).should('have.text', '로이드포코');
  });

  it('지하철 노선을 삭제할 수 있다.', () => {
    deleteLine('로이드포코');
    cy.get('.js-line-list').should('not.contain', '로이드포코');
  });
});
