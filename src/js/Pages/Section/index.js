import { privateApis } from '../../api';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import { $ } from '../../utils/DOM';
import AddModal from './AddModal';
import { mainTemplate, sectionItem } from './template';

class Section extends Component {
  constructor({ parentNode, state }) {
    super({
      parentNode,
      childComponents: {
        addmodal: new AddModal({
          parentNode,
          modalkey: 'section-add',
        }),
      },
      state,
    });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('.js-section-item__create').addEventListener('click', () => {
      // create 로쥑
      this.childComponents.addmodal.show();
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
      const accessToken = localStorage.getItem('accessToken') || '';

      try {
        const response = await privateApis.Sections.delete(
          lineId,
          stationId,
          accessToken
        );

        if (response.status === 401) {
          throw Error(ERROR_MESSAGE.INVALID_TOKEN);
        }

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  async updateSubwayState() {
    const accessToken = localStorage.getItem('accessToken') || '';

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}

export default Section;
