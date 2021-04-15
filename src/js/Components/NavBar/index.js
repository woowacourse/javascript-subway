import { AUTHENTICATED_LINK, UNAUTHENTICATED_LINK } from '../../constants/link';
import Component from '../../core/Component';
import template from './template';

class NavBar extends Component {
  constructor({ parentNode }) {
    super({ parentNode });
  }

  renderSelf() {
    this.parentNode.innerHTML = template(
      this.state.isLogin ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }
}

export default NavBar;
