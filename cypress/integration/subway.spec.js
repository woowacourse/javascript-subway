const id = 'test123@test123.com';
const pw = 'test123';

function login(id, pw) {
  cy.get('#email').type(id);
  cy.get('#password').type(pw);
  cy.get('#login-form').submit();
}

function addStation(name) {
  cy.get('#station-name').clear();
  cy.get('#station-name').type(name);
  cy.get('#station-form').submit();
}

function editStation(targetName, newName) {
  cy.get(`[data-name="${targetName}"] .js-station-edit-button`).click();
  cy.get('#station-name-edit-form #station-edit-name').clear();
  cy.get('#station-name-edit-form #station-edit-name').type(newName);
  cy.get('#station-name-edit-form').submit();
}

function deleteStation(targetName) {
  cy.get(`[data-name="${targetName}"] .js-station-delete-button`).click();
}

function addLine({ name, upStation, downStation, duration, distance, color }) {
  cy.get('#create-line-button').click();

  cy.get('#line-add-form #subway-line-name').type(name);
  cy.get('#line-add-form #up-station').select(upStation);
  cy.get('#line-add-form #down-station').select(downStation);

  cy.get('#duration').type(duration);
  cy.get('#distance').type(distance);
  cy.get(`#line-add-form .js-subway-line-color-selector .${color}`).click();
  cy.get('#line-add-form .js-input-submit').click({ force: true });
}

function editLine({ targetName, name, color }) {
  cy.get(`[data-name="${targetName}"] .js-line-edit-button`).click({ force: true });
  cy.get('#line-edit-form #subway-line-name').clear().type(name);
  cy.get(`#line-edit-form .${color}`).click();
  cy.get('#line-edit-form .js-input-submit').click({ force: true });
}

function deleteLine(name) {
  cy.get(`[data-name="${name}"] .js-line-delete-button`).click({ force: true });
}

function addSection({ upStation, downStation, distance, duration }) {
  if (upStation) {
    cy.get('#section-add-form #up-station').select(upStation);
  }

  if (downStation) {
    cy.get('#section-add-form #down-station').select(downStation);
  }

  cy.get('#section-add-form #distance').type(distance);
  cy.get('#section-add-form #duration').type(duration);
  cy.get('.js-input-submit').click();
}

function deleteSection(upStationName) {
  cy.get(`.js-section-list-item[data-up-station-name="${upStationName}"] .js-section-delete-button`).click({
    force: true,
  });
}

describe('지하철 노선도 STEP1', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    login(id, pw);
  });

  it('[역 관리] 메뉴를 클릭하면, 역 관리 페이지가 렌더된다.', () => {
    cy.get('#stations-nav-link').click();
    cy.url().should('include', '/stations');
    cy.get('#stations-container').should('exist');
  });
});

describe('지하철 역 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login(id, pw);
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

describe('지하철 노선 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login(id, pw);
  });

  it('지하철 노선을 등록할 수 있다.', () => {
    cy.get('#lines-nav-link').click();

    addLine({
      name: '로이드호선호',
      upStation: '고려대',
      downStation: '연세대',
      duration: 10,
      distance: 10,
      color: 'bg-gray-300',
    });

    cy.get('.js-line-list-item[data-name="로이드호선호"]').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선호"] .subway-line-color-dot.bg-gray-300').should('exist');
    cy.get('.js-line-list-item[data-name="로이드호선호"] .js-line-name').should('have.text', '로이드호선호');
  });

  // TODO: 지하철 노선 수정 코드
  // TODO: 지하철 구간 테스트 코드 작성
  // TODO: after() 에 테스트를 위해 등록한 노선, 구간, 역 모두 삭제 처리

  it('지하철 노선을 수정할 수 있다.', () => {
    editLine({ targetName: '로이드호선호', name: '로이드포코', color: 'bg-purple-300' });

    cy.get('[data-name="로이드포코"]').should('exist');
    cy.get('[data-name="로이드포코"] .subway-line-color-dot.bg-purple-300').should('exist');
    cy.get('[data-name="로이드포코"] .js-line-name').should('have.text', '로이드포코');
  });

  it('지하철 노선을 삭제할 수 있다.', () => {
    deleteLine('로이드포코');
    cy.get('.js-line-list').should('not.contain', '로이드포코');
  });
});

describe('지하철 구간 관리', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    login(id, pw);

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
    cy.get('.js-section-add-button').eq(1).click({ force: true });

    addSection({ downStation: '브라운감사해요역', distance: 10, duration: 10 });
    cy.wait(500).get('.js-section-list-item').eq(2).contains('브라운감사해요역');
  });

  // it('지하철 구간을 최상단에 추가할 수 있다.', () => {
  //   cy.get('.js-section-add-button').eq(0).click();

  //   addSection({ downStation: '브라운밥사주세요역', distance: 10, duration: 10 });
  //   cy.get('.js-section-list-item').eq(1).contains('브라운감사해요역');
  // });

  it('지하철 구간을 최하단에 추가할 수 있다.', () => {
    cy.get('.js-section-add-button').eq(-1).click({ force: true });

    addSection({ downStation: '브라운커피사주세요역', distance: 10, duration: 10 });
    cy.wait(500).get('.js-section-list-item').eq(-1).should('contain', '브라운커피사주세요역');
  });

  it('지하철 구간을 삭제할 수 있다.', () => {
    deleteSection('브라운사랑해요역');
    cy.wait(500).get('.js-section-list-item').should('not.contain', '브라운사랑해요역');
  });

  after(() => {
    // 노선 관리 페이지로 이동한다
    cy.get('#lines-nav-link').click({ force: true });

    // 노선 관리 페이지의 모든 삭제 버튼을 each로 순회하여 모든 노선을 삭제한다.
    cy.get('.js-line-delete-button').each($element => {
      $element.click();
    });

    // 역 관리 페이지로 이동한다.
    cy.get('#stations-nav-link').click({ force: true });

    // 역 관리 페이지의 모든 삭제 버튼을 each로 순회하여 모든 노선을 삭제한다.
    cy.get('.js-station-delete-button').each($element => {
      $element.click({ force: true });
    });
  });
});
