import getSubwayState from '../../api/apis.js';
import getFetchParams from '../../api/getFetchParams.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import Modal from './modal.js';
import { mainTemplate, sectionItem } from './template/main.js';

class Section extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      { modal: new Modal($('.js-modal'), stateManagers) },
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
    // TODO: Section Create
    $('.js-section-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
    });

    // TODO: 선택한 Section에 따라 안의 내용을 보여주는 Event
    $('.js-section-form__select').addEventListener('change', ({ target }) => {
      const lineId = target.value;
      const { color, stations } = this.state.lines.find(
        (line) => line.id === Number(lineId)
      );

      $('.js-section-list').innerHTML = stations
        .map((station) => sectionItem(station))
        .join('');

      $('.js-section-list').setAttribute('data-line-id', lineId);
      $('.js-section-form__select').setAttribute('data-bg-color', color);
    });

    // TODO: Section에 있는 역을 지워주는 Event
    $('.js-section-list').addEventListener('click', async ({ target }) => {
      if (!target.classList.contains('js-section-item__delete')) return;
      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const lineId = target.closest('.js-section-list').dataset.lineId;
      const stationId = target.closest('.js-section-item').dataset.stationId;
      const accessToken = this.stateManagers.accessToken.getToken();

      const params = getFetchParams({
        path: `${PATH.LINES}/${lineId}/sections?stationId=${stationId}`,
        accessToken,
      });

      try {
        const response = await request.delete(params);

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();
    const { stations, lines } = await getSubwayState(accessToken);

    this.setState({ stations, lines });
  }
}

export default Section;
