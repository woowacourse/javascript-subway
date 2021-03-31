import getSubwayState, { privateApis } from '../../api/apis.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import Modal from './modal.js';
import { mainTemplate, sectionItem } from './template/main.js';

class Section extends Component {
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

    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    $('.js-section-item__create').addEventListener('click', () => {
      // create 로쥑
      this.childComponents.modal.show();
    });

    $('.js-section-form__select').addEventListener('change', ({ target }) => {
      const lineId = target.value;
      const { color, stations } = this.state.lines.find(
        (line) => line.id === Number(lineId)
      );
      console.log(stations);

      $('.js-section-list').innerHTML = stations
        .map((station) => sectionItem(station))
        .join('');

      $('.js-section-list').setAttribute('data-line-id', lineId);
      $('.js-section-form__select').setAttribute('data-bg-color', color);
    });

    $('.js-section-list').addEventListener('click', async ({ target }) => {
      if (!target.classList.contains('js-section-item__delete')) return;
      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const lineId = target.closest('.js-section-list').dataset.lineId;
      const stationId = target.closest('.js-section-item').dataset.stationId;
      const accessToken = this.stateManagers.accessToken.getToken();

      try {
        const response = await privateApis.Sections.delete(
          lineId,
          stationId,
          accessToken
        );

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}

export default Section;
