import { root, menuButtons } from './views';
import { $ } from '../@shared/utils';

export class Subway {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.render();
  }

  selectDOM() {
    this.$menuContainer = $('.menu-buttons-container');
    this.$mainContainer = $('main');
  }

  render() {
    this.$menuContainer.innerHTML = this.props.isSigned ? menuButtons : '';
    this.$mainContainer.innerHTML = root(this.props.isSigned);
  }
}
