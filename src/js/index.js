import '../css/index.css';
import { $ } from './utils/DOM';
import App from './App';
import { AUTHENTICATED_LINK } from './constants/link';
import LOCAL_STORAGE_KEY from './constants/localStorage';

const initalState = {
  isLogin: false,
};

const app = new App({
  parentNode: $('#app'),
  state: initalState,
});

(function initEventListeners() {
  window.addEventListener('popstate', (e) => {
    app.renderComponent(e.state.path);
  });

  window.addEventListener('load', () => {
    history.replaceState({ path: location.pathname }, null, location.pathname);

    app.renderComponent(location.pathname);
  });

  $('.js-header').addEventListener('click', (e) => {
    const anchor = e.target.closest('.js-link');
    if (!anchor) return;

    e.preventDefault();

    const path = anchor.getAttribute('href');
    if (path === AUTHENTICATED_LINK.LOGOUT.PATH) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
      app.setIsLogin(false);
      app.goPage(UNAUTHENTICATED_LINK.LOGIN.PATH);

      return;
    }

    app.goPage(path);
  });
})();

app.checkLogin();
