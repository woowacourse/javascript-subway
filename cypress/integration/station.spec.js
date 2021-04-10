import { login } from '../support/auth';
import { addStation, editStation, deleteStation } from '../support/station';

describe('지하철 역 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login();
  });

  it('지하철 역을 등록할 수 있다.', () => {
    ['낙성대', '연세대', '고려대'].forEach(station => {
      addStation(station);
      cy.get('#station-list .js-station-list-item').should('contain', station);
    });
  });

  it('지하철역을 수정할 수 있다.', () => {
    editStation('낙성대', '서울대');
    cy.get('#station-list .js-station-list-item').should('contain', '서울대');
    cy.get('#station-list .js-station-list-item').should('not.contain', '낙성대');
  });

  it('지하철역을 삭제할 수 있다.', () => {
    deleteStation('서울대');
    cy.get('#station-list .js-station-list-item').should('not.contain', '서울대');
  });
});
