import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { SELECTOR } from '../../src/js/subway/constants';
import { ROUTE, SESSION_KEY } from '../../src/js/subway/constants/constants';

describe('로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  });

  it('로그인 실패 시, 에러 메시지를 렌더링한다.', () => {
    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type('test@gmail.com');
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type('123');
    cy.get('.input-submit').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_MSG}`).should('be.visible');
  });

  it('로그인 성공 시, 메뉴 버튼들과 로그아웃 버튼이 화면에 노출되고 메인 페이지로 이동한다.', () => {
    const accounts = require('../accounts.json');

    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(accounts.email);
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(accounts.password);
    cy.get('.input-submit').click();
    cy.get(`${SELECTOR.CONTAINER.MENU_BUTTON} > .js-link`).each($button => cy.wrap($button).should('be.visible'));
    cy.get('[data-link="/signout"]').should('be.visible');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(ROUTE.ROOT);
    });
  });

  it('로그아웃 성공 시, 로그인 버튼이 화면에 노출되고 메인 페이지로 이동한다.', () => {
    const accounts = require('../accounts.json');

    cy.get('[data-link="/signin"]').click();
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(accounts.email);
    cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(accounts.password);
    cy.get('.input-submit').click();
    cy.get('[data-link="/signout"]').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(ROUTE.ROOT);
    });
  });
});
