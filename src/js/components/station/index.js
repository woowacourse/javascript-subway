import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { mainTemplate } from './template/main.js';
import Component from '../../core/Component.js';
import getFetchParams from '../../api/getFetchParams.js';
import Modal from './modal.js';
import getSubwayState from '../../api/getState.js';
import { MODAL, STATION } from '../../constants/selector.js';
import api from '../../api/requestHttp.js';

class Station extends Component {
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
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.stations);
  }

  addEventListeners() {
    this.createStationEvent();
    this.editOrDeleteStationEvent();
  }

  createStationEvent() {
    $(STATION.ID.CREATE_FORM).addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();
      const params = getFetchParams({
        path: PATH.STATIONS,
        body: { name },
        accessToken,
      });

      await api.create(
        params,
        this.snackbar,
        this.updateSubwayState.bind(this)
      );
      e.target['station-name'].focus();
    });
  }

  editOrDeleteStationEvent() {
    $(STATION.CLASS.ITEM_LIST).addEventListener('click', async ({ target }) => {
      if (target.classList.contains(STATION.CLASSLIST.EDIT_ITEM)) {
        this.childComponents.modal.setTargetId(
          target.closest(STATION.CLASS.ITEM).dataset.id
        );
        this.childComponents.modal.show();
      }

      if (target.classList.contains(STATION.CLASSLIST.DELETE_ITEM)) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const { id } = target.closest(STATION.CLASS.ITEM).dataset;
        const accessToken = this.stateManagers.accessToken.getToken();
        const params = getFetchParams({
          path: `${PATH.STATIONS}/${id}`,
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

  async updateSubwayState() {
    const { stations, lines } = await getSubwayState(
      this.stateManagers.accessToken.getToken()
    );
    this.setState({ stations, lines });
  }
}

export default Station;
