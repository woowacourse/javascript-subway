import { removeFromSessionStorage } from '../../src/js/@shared/utils';
import { ROUTE, SESSION_KEY } from '../../src/js/subway/constants/constants';
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

      invalidNames.forEach(name => expect(isValidName(name)).to.equal(false));
      expect(isValidName(validName)).to.equal(true);
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
      cy.get('#signup-email').type('@gmail.com');
      cy.get('#signup-name').type('     ');
      cy.get('#signup-password').type('a');
      cy.get('#signup-password-confirm').type('b');
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
      cy.get('#signin-email').type('test@gmail.com');
      cy.get('#signin-password').type('123');

      cy.get('.input-submit').click();

      cy.get('#fail-message-box').should('be.visible');
    });

    it('로그인 성공 시, 메뉴 버튼들과 로그아웃 버튼이 화면에 노출되고 메인 페이지로 이동한다.', () => {
      cy.get('[data-link="/signin"]').click();
      cy.get('#signin-email').type(testMail);
      cy.get('#signin-password').type(testPassword);

      cy.get('.input-submit').click();

      cy.get('#menu-buttons-container > .js-link').each($button => cy.wrap($button).should('be.visible'));

      cy.get('[data-link="/signout"]').should('be.visible');

      cy.location().should(loc => {
        expect(loc.pathname).to.eq(ROUTE.ROOT);
      });
    });

    it('로그아웃 성공 시, 로그인 버튼이 화면에 노출되고 메인 페이지로 이동한다.', () => {
      cy.get('[data-link="/signin"]').click();
      cy.get('#signin-email').type(testMail);
      cy.get('#signin-password').type(testPassword);

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

      cy.get('[data-link="/signin"]').click();
      cy.get('#signin-email').type('test@gmail.com');
      cy.get('#signin-password').type('123');

      cy.get('.input-submit').click();

      cy.get('[data-link="/stations"]').click();
    });

    it('역 추가 시, 역이름이 2 ~ 20글자가 아니면 에러 메시지를 렌더링한다.', () => {
      cy.get('#station-name').type('a');
      cy.get('#station-add-button').click();
      cy.get('#fail-message-box').should('be.visible');

      cy.get('#station-name').type('a'.repeat(21));
      cy.get('#station-add-button').click();
      cy.get('#fail-message-box').should('be.visible');
    });

    it('지하철 역을 등록할 수 있다.', () => {
      const randomName = Data.now().toString().slice(-4);

      cy.get('#station-name').type(randomName);
      cy.get('#station-add-button').click();

      cy.get('#station-list:last-child').should('have.text', randomName);
    });

    it('지하철 역 이름을 수정할 수 있다.', () => {
      cy.get('#station-list:last-child > .js-update-button').click();
      cy.get('#station-update-modal').should('be.visible');

      // cy.get('#station-update-modal > #name-input').type('수정한 이름');
      // cy.get('#station-update-modal > #확인버튼').click();
      // cy.get('#station-update-modal > #X버튼').click();
      // cy.get('#station-list:last-child').should('have.text', '수정한 이름');
    });

    it('지하철 역 이름을 삭제할 수 있다.', () => {
      cy.get('#station-list:last-child > .js-remove-button').click();

      // cy.get('#station-list:last-child').should('have.not.text', '수정한 이름');
    });
  });
});
