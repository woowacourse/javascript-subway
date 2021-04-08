import getSubwayState from '../../api/getState.js';
import getFetchParams from '../../api/getFetchParams.js';
import { CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '../../constants/message.js';
import { DATASET, MODAL, SECTION } from '../../constants/selector.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import { mainTemplate, sectionItem } from './template/main.js';
import Modal from './modal.js';
import api from '../../api/requestHttp.js';
class Section extends Component {
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
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    this.createSectionEvent();
    this.selectLineEvent();
    this.deleteSectionItemEvent();
  }

  createSectionEvent() {
    $(SECTION.CLASS.CREATE_ITEM).addEventListener('click', () => {
      this.childComponents.modal.show();
    });
  }

  selectLineEvent() {
    $(SECTION.CLASS.FORM_SELECT).addEventListener('change', ({ target }) => {
      const lineId = target.value;
      const { color, stations } = this.state.lines.find(
        (line) => line.id === Number(lineId)
      );

      $(SECTION.CLASS.ITEM_LIST).innerHTML = stations
        .map((station) => sectionItem(station))
        .join('');

      $(SECTION.CLASS.ITEM_LIST).setAttribute(DATASET.LINE_ID, lineId);
      $(SECTION.CLASS.FORM_SELECT).setAttribute(DATASET.BG_COLOR, color);
    });
  }

  deleteSectionItemEvent() {
    $(SECTION.CLASS.ITEM_LIST).addEventListener('click', async ({ target }) => {
      if (!target.classList.contains(SECTION.CLASSLIST.DELETE_ITEM)) return;
      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const lineId = target.closest(SECTION.CLASS.ITEM_LIST).dataset.lineId;
      const stationId = target.closest(SECTION.CLASS.ITEM).dataset.stationId;
      const accessToken = this.stateManagers.accessToken.getToken();

      const params = getFetchParams({
        path: `${PATH.LINES}/${lineId}/sections?stationId=${stationId}`,
        accessToken,
      });

      await api.delete(
        params,
        this.snackbar,
        this.updateSubwayState.bind(this)
      );
    });
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();
    const { stations, lines } = await getSubwayState(accessToken);

    this.setState({ stations, lines });
  }
}

export default Section;
