import { $ } from './utils/DOM';
import { AUTHENTICATED_LINK, UNAUTHENTICATED_LINK } from './constants/link';
import Component from './core/Component';
import { publicApis } from './api';
import NavBar from './Components/NavBar';
import ExpiredTokenError from './error/ExpiredTokenError';
import LOCAL_STORAGE_KEY from './constants/localStorage';
import Router from './router';

class App extends Component {
  constructor({ parentNode, state }) {
    super({ parentNode, state });

    this.Router = new Router({
      props: {
        goPage: this.goPage.bind(this),
        isLogin: this.isLogin.bind(this),
        setIsLogin: this.setIsLogin.bind(this),
      },
    });

    this.childComponents = {
      navBar: new NavBar({
        parentNode: $('.js-header'),
      }),
    };
  }

  async checkLogin() {
    this.setIsLogin(await this.isValidAccessToken());
  }

  isLogin() {
    return this.state.isLogin;
  }

  setIsLogin(isLogin) {
    this.setState({ ...this.state, isLogin });
  }

  async renderComponent(path = location.pathname) {
    const component = this.Router.route[path]();

    component.render();
    try {
      await component.updateSubwayState?.();
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        this.setIsLogin(false);
        this.goPage(UNAUTHENTICATED_LINK.LOGIN);
      }
      console.error(error.message);
    }
  }

  async goPage(path) {
    history.pushState({ path }, null, path);
    this.renderComponent(path);
  }

  async isValidAccessToken() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
    try {
      await publicApis.me(accessToken);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  addStaticEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.renderComponent(e.state.path);
    });

    window.addEventListener('load', () => {
      history.replaceState(
        { path: location.pathname },
        null,
        location.pathname
      );

      this.renderComponent(location.pathname);
    });

    window.addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const path = anchor.getAttribute('href');
      if (path === AUTHENTICATED_LINK.LOGOUT.PATH) {
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
        this.setIsLogin(false);
        this.goPage(UNAUTHENTICATED_LINK.LOGIN.PATH);

        return;
      }

      this.goPage(path);
    });
  }
}

export default App;
