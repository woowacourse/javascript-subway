import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { SELECTOR } from '../../src/js/subway/constants';
import { NAME_LENGTH, ROUTE, SESSION_KEY } from '../../src/js/subway/constants/constants';
import { isValidEmail, isValidName, isValidPassword } from '../../src/js/subway/utils';

const testMail = 'testUser@gmail.com';
const testPassword = 'wooteco123!';

describe('Subway test', () => {
  describe('Sign-up test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/');
    });

    it('email은 이메일 형식을 허용한다.', () => {
      const invalidEmails = ['@gmail.com', 'loyd@', 'loyd@gmail..com', 'loyd@@gmail.com'];
      const validMail = 'loyd@gmail.com';
      invalidEmails.forEach(email => expect(isValidEmail(email)).to.equal(false));
      expect(isValidEmail(validMail)).to.equal(true);
    });

    it('name은 한글, 영어, 숫자만 허용한다.', () => {
      const invalidNames = ['     ', '로이드😀', '荒唐無稽', '!@#$%'];
      const validName = '로이드';
      invalidNames.forEach(name =>
        expect(isValidName(name, NAME_LENGTH.USER_MIN, NAME_LENGTH.USER_MAX)).to.equal(false)
      );
      expect(isValidName(validName, NAME_LENGTH.USER_MIN, NAME_LENGTH.USER_MAX)).to.equal(true);
    });

    it('password는 최소 6자이상, 영숫자 및 특수문자의 조합으로 이루어져야 한다.', () => {
      const invalidPasswords = ['a', 'mooyaho123', 'mooyaho!', '123!!!', '    '];
      const validPassword = 'mooyaho123!';
      invalidPasswords.forEach(password => expect(isValidPassword(password)).to.equal(false));
      expect(isValidPassword(validPassword)).to.equal(true);
    });

    it('회원가입 시, 각 인풋에 대한 기준이 부합하지 않으면 에러 메시지를 렌더링한다.', () => {
      cy.get('[data-link="/signin"]').click();
      cy.get('[data-link="/signup"]').click();
      cy.get(`#${SELECTOR.USER_JOIN.MAIN.EMAIL_INPUT}`).type('@gmail.com');
      cy.get(`#${SELECTOR.USER_JOIN.MAIN.NAME_INPUT}`).type('     ');
      cy.get(`#${SELECTOR.USER_JOIN.MAIN.PASSWORD_INPUT}`).type('a');
      cy.get(`#${SELECTOR.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT}`).type('b');
      cy.get('.js-message-box').each(element => cy.wrap(element).should('be.visible'));
    });
  });

  describe('Sign-in test', () => {
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
      cy.get('[data-link="/signin"]').click();
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(testMail);
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(testPassword);
      cy.get('.input-submit').click();
      cy.get(`${SELECTOR.CONTAINER.MENU_BUTTON} > .js-link`).each($button => cy.wrap($button).should('be.visible'));
      cy.get('[data-link="/signout"]').should('be.visible');
      cy.location().should(loc => {
        expect(loc.pathname).to.eq(ROUTE.ROOT);
      });
    });

    it('로그아웃 성공 시, 로그인 버튼이 화면에 노출되고 메인 페이지로 이동한다.', () => {
      cy.get('[data-link="/signin"]').click();
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(testMail);
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(testPassword);
      cy.get('.input-submit').click();
      cy.get('[data-link="/signout"]').click();
      cy.location().should(loc => {
        expect(loc.pathname).to.eq(ROUTE.ROOT);
      });
    });
  });

  describe('Station-manage test', () => {
    before(() => {
      cy.visit('http://localhost:8080/');
      removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      cy.get('[data-link="/signin"]').click();
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(testMail);
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(testPassword);
      cy.get('.input-submit').click();
      cy.get('[data-link="/stations"]').click();
    });

    it('역 추가 시, 역이름이 2 ~ 20글자가 아니면 에러 메시지를 렌더링한다.', () => {
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type('a');
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_MSG}`).should('be.visible');
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type('a'.repeat(21));
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_MSG}`).should('be.visible');
    });

    it('지하철 역을 등록할 수 있다.', () => {
      const randomName = Date.now().toString().slice(-4);
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).clear();
      cy.get(`#${SELECTOR.STATION.MAIN.NAME_INPUT}`).type(randomName);
      cy.get(`#${SELECTOR.STATION.MAIN.SUBMIT_BUTTON}`).click();
      cy.get('.js-station-list-item:last > .js-station-name').should('have.text', randomName);
    });

    it('지하철 역 이름을 수정할 수 있다.', () => {
      const randomName = Date.now().toString().slice(-4);
      cy.get('.js-station-list-item:last > .js-modify-button').click();
      cy.get(`#${SELECTOR.STATION.MODAL.FORM}`).should('be.visible');
      cy.get(`#${SELECTOR.STATION.MODAL.NAME_INPUT}`).clear();
      cy.get(`#${SELECTOR.STATION.MODAL.NAME_INPUT}`).type(randomName);
      cy.get(`#${SELECTOR.STATION.MODAL.SUBMIT_BUTTON}`).click();
      cy.get('.js-station-list-item:last > .js-station-name').should('have.text', randomName);
    });

    it('지하철 역 이름을 삭제할 수 있다.', () => {
      cy.get('.js-station-list-item:last > .js-remove-button').click();
      cy.get('.js-station-list-item').should('have.length', 2);
    });
  });

  describe('Line-manange test', () => {
    before(() => {
      cy.visit('http://localhost:8080/');
      removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      cy.get('[data-link="/signin"]').click();
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(testMail);
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(testPassword);
      cy.get('.input-submit').click();
      cy.get('[data-link="/lines"]').click();
    });

    it('노선 추가 시, 노선 이름이 2 ~ 10글자가 아니면 에러 메시지를 렌더링한다.', () => {
      cy.get(`#${SELECTOR.LINE.MAIN.ADD_MODAL_BUTTON}`).click();
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type('a');
      cy.get(`#${SELECTOR.LINE.MODAL.MSG}`).should('be.visible');
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type('a'.repeat(11));
      cy.get(`#${SELECTOR.LINE.MODAL.MSG}`).should('be.visible');
    });

    it('노선을 등록할 수 있다.', () => {
      const randomName = Date.now().toString().slice(-5);
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type(`${randomName}`);
      cy.get(`#${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}`).select('1340');
      cy.get(`#${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}`).select('1341');
      cy.get(`#${SELECTOR.LINE.MODAL.DISTANCE_INPUT}`).type(2);
      cy.get(`#${SELECTOR.LINE.MODAL.DURATION_INPUT}`).type(10);
      cy.get(`#${SELECTOR.LINE.MODAL.SUBMIT_BUTTON}`).click({ force: true });
      cy.get('.js-line-list-item').get('.js-line-name').last().should('have.text', randomName);
    });

    it('노선을 수정할 수 있다.', () => {
      cy.get('.js-modify-button:first').click();
      const randomName = Date.now().toString().slice(-5);
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).clear();
      cy.get(`#${SELECTOR.LINE.MODAL.NAME_INPUT}`).type(`${randomName}`);
      cy.get(`#${SELECTOR.LINE.MODAL.SUBMIT_BUTTON}`).click();
      cy.wait(500);
      cy.get('.js-line-list-item').get('.js-line-name').first().should('have.text', randomName);
    });

    it('노선을 삭제할 수 있다.', () => {
      cy.get('.js-remove-button:first').click();
      cy.get('.js-line-list-item:last > .js-line-name').should('not.exist');
    });
  });

  describe('Section-manange test', () => {
    before(() => {
      cy.visit('http://localhost:8080/');
      removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      cy.get('[data-link="/signin"]').click();
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.EMAIL_INPUT}`).type(testMail);
      cy.get(`#${SELECTOR.USER_AUTH.MAIN.PASSWORD_INPUT}`).type(testPassword);
      cy.get('.input-submit').click();
      cy.get('[data-link="/sections"]').click();
    });

    it('구간을 등록할 수 있다.', () => {
      cy.get(`#${SELECTOR.SECTION.MAIN.LINE_SELECTOR}`).select('439');
      cy.get(`#${SELECTOR.SECTION.MAIN.ADD_MODAL_BUTTON}`).click();
      cy.get(`#${SELECTOR.SECTION.MODAL.UP_STATION_SELECTOR}`).select('1341');
      cy.get(`#${SELECTOR.SECTION.MODAL.DOWN_STATION_SELECTOR}`).select('1647');
      cy.get(`#${SELECTOR.SECTION.MODAL.DISTANCE_INPUT}`).type(5);
      cy.get(`#${SELECTOR.SECTION.MODAL.DURATION_INPUT}`).type(5);
      cy.get(`#${SELECTOR.SECTION.MODAL.SUBMIT_BUTTON}`).click({ force: true });
      cy.get('.js-station-list-item').should('have.length', 3);
    });

    it('구간을 삭제할 수 있다.', () => {
      cy.get('.js-remove-button:last').click();
      cy.get('.js-station-list-item').should('have.length', 2);
    });
  });
});
