import { AUTHENTICATED_LINK, UNAUTHENTICATED_LINK } from '../../constants/link';
import Component from '../../core/Component';
import template from './template';

class NavBar extends Component {
  constructor({ parentNode, state, props: { goPage, setIsLogin } }) {
    super({ parentNode, state });

    this.goPage = goPage;
    this.setIsLogin = setIsLogin;
  }

  renderSelf() {
    this.parentNode.innerHTML = template(
      this.state.isLogin ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  addEventListeners() {
    this.parentNode.addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const path = anchor.getAttribute('href');
      if (path === AUTHENTICATED_LINK.LOGOUT.PATH) {
        this.setIsLogin(false);
        this.goPage(UNAUTHENTICATED_LINK.LOGIN.PATH);

        return;
      }

      this.goPage(path);
    });
  }
}

export default NavBar;
