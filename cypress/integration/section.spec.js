import { login } from '../support/auth';
import { addStation } from '../support/station';
import { addLine } from '../support/line';
import { addSection, deleteSection } from '../support/section';

describe('지하철 구간 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login();

    cy.get('#stations-nav-link').click();
    addStation('브라운사랑해요역');
    addStation('브라운고마워요역');
    addStation('브라운감사해요역');
    addStation('브라운밥사주세요역');
    addStation('브라운커피사주세요역');

    cy.get('#lines-nav-link').click();

    addLine({
      name: '브라운브라운 호선',
      upStation: '브라운사랑해요역',
      downStation: '브라운고마워요역',
      distance: 20,
      duration: 20,
      color: 'bg-purple-300',
    });

    cy.get('#sections-nav-link').click();
    cy.get('#line-select').select('브라운브라운 호선');
  });

  it('지하철 구간을 중간에 추가할 수 있다.', () => {
    cy.get('.js-section-add-button').eq(2).click({ force: true });

    addSection({ downStation: '브라운감사해요역', distance: 10, duration: 10 });
    cy.wait(500).get('.js-section-list-item').eq(3).contains('브라운감사해요역');
  });

  it('지하철 구간을 최상단에 추가할 수 있다.', () => {
    cy.get('.js-section-add-button').eq(0).click({ force: true });

    addSection({ upStation: '브라운밥사주세요역', distance: 10, duration: 10 });
    cy.wait(500).get('.js-section-list-item').eq(1).should('contain', '브라운밥사주세요역');
  });

  it('지하철 구간을 최하단에 추가할 수 있다.', () => {
    cy.get('.js-section-add-button').eq(-1).click({ force: true });

    addSection({ downStation: '브라운커피사주세요역', distance: 10, duration: 10 });
    cy.wait(500).get('.js-section-list-item').eq(-1).should('contain', '브라운커피사주세요역');
  });

  it('지하철 구간을 삭제할 수 있다.', () => {
    deleteSection('브라운커피사주세요역');
    cy.wait(500).get('.js-section-list-item').should('not.contain', '브라운커피사주세요역');
  });

  after(() => {
    cy.get('#lines-nav-link').click({ force: true });
    cy.get('.js-line-delete-button').each($element => {
      $element.click();
    });

    cy.wait(500);

    cy.get('#stations-nav-link').click({ force: true });
    cy.get('.js-station-delete-button').each($element => {
      $element.click();
    });
  });
});
