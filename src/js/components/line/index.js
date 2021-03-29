import getSubwayState from '../../api/apis.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import Modal from './modal.js';
import mainTemplate from './template/main.js';

class Line extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      {
        modal: new Modal($('.js-modal'), stateManagers),
      },
      {
        stations: [],
        lines: [],
      }
    );

    this.updateSubwayState();

    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    const lines = this.state.lines;
    this.parentNode.innerHTML = mainTemplate(lines);
  }

  addEventListeners() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
    });
  }

  async updateSubwayState() {
    const { stations, lines } = await getSubwayState(
      this.stateManagers.accessToken.getToken()
    );

    this.setState({ stations, lines });
  }
}

export default Line;
