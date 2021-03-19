import { MESSAGE } from './constants.js';
import SignupPage from './signup/Signup.js';
import LoginPage from './login/Login.js';

// TODO: async, await 적용할 부분이 있는지 찾아보기
class Router {
  constructor() {
    this.userToken = '';
    this.signupPage = new SignupPage(this);
    this.loginPage = new LoginPage(this);

    this.routes = {
      '/': this.userToken ? '../index.html' : this.loginPage,
      '/signup': this.signupPage,
    };
  }

  init() {
    this.back();
    this.navigate('/');
  }

  navigate(path) {
    try {
      const targetPage = this.routes[path];

      if (!targetPage) {
        throw new Error(MESSAGE.ERROR.PAGE_NOT_FOUND);
      }

      targetPage.init();
      window.history.pushState({ path }, null, path);
    } catch (error) {
      console.error(error);
    }
  }

  back() {
    window.addEventListener('popstate', e => {
      if (!e.state) return;

      this.navigate(e.state.path);
    });
  }
}

export default Router;
