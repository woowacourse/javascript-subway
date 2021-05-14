import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import sorted from '../../utils/sort.js';
import mainTemplate from './template/main.js';
import { lineFormDetail } from './template/modal.js';
import Modal from './modal.js';
import api from '../../api/requestHttp.js';
import getSubwayState from '../../api/getState.js';
import getFetchParams from '../../api/getFetchParams.js';
import { PATH } from '../../constants/url.js';
import { LINE, MODAL } from '../../constants/selector.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
class Line extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      { modal: new Modal($(MODAL.MAIN_CONTAINER), stateManagers) },
      { stations: [], lines: [] }
    );
    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
    this.#order = false;
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    this.#createLineEvent();
    this.#editOrDeleteLineEvent();
    this.#sortLineItems();
  }

  #createLineEvent() {
    $(LINE.CLASS.CREATE_ITEM).addEventListener('click', () => {
      this.childComponents.modal.show();
      this.childComponents.modal.clearForm();
      this.childComponents.modal.requestType = 'post';
      $(LINE.CLASS.DETAIL_CONTAINER).innerHTML = lineFormDetail(
        this.state.stations
      );
    });
  }

  #editOrDeleteLineEvent() {
    $(LINE.CLASS.ITEM_LIST).addEventListener('click', async ({ target }) => {
      if (target.classList.contains(LINE.CLASSLIST.EDIT_ITEM)) {
        this.childComponents.modal.show();
        this.childComponents.modal.requestType = 'put';
        $(LINE.CLASS.FORM_DETAIL)?.remove();

        const id = target.closest(LINE.CLASS.ITEM).dataset.id;
        this.childComponents.modal.setTargetId(id);
      }

      if (target.classList.contains(LINE.CLASSLIST.DELETE_ITEM)) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const id = target.closest(LINE.CLASS.ITEM).dataset.id;
        const accessToken = this.stateManagers.accessToken.getToken();
        const params = getFetchParams({
          path: `${PATH.LINES}/${id}`,
          accessToken,
        });

        await api.delete(
          params,
          this.snackbar,
          this.updateSubwayState.bind(this)
        );
      }
    });
  }

  #sortLineItems() {
    $(LINE.CLASS.SORT).addEventListener('click', () => {
      this.#order = !this.#order;

      if (this.#order) {
        this.state.lines.sort((a, b) => sorted(a, b, 'name'));
        this.setState(this.state);

        return;
      }

      this.state.lines.sort((a, b) => sorted(b, a, 'name'));
      this.setState(this.state);

      return;
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
