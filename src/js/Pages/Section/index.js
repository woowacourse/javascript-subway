import Apis from '../../api';
import { CONFIRM_MESSAGE } from '../../constants/message';
import PageComponent from '../../core/PageComponent';
import { $ } from '../../utils/DOM';
import AddModal from './AddModal';
import { mainTemplate, sectionItem } from './template';
import HTTPError from '../../error/HTTPError';
import { AUTHENTICATED_LINK } from '../../constants/link';

class Section extends PageComponent {
  constructor({ parentNode }) {
    super({
      parentNode,
      pathname: AUTHENTICATED_LINK.SECTION.PATH,
    });

    this.childComponents = {
      addModal: new AddModal({
        parentNode,
        modalName: 'section-add',
        props: {
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
    };
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('.js-section-item__create').addEventListener('click', () => {
      this.childComponents.addModal.show();
    });

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

    $('.js-section-list').addEventListener('click', async ({ target }) => {
      if (!target.classList.contains('js-section-item__delete')) return;
      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const lineId = target.closest('.js-section-list').dataset.lineId;
      const stationId = target.closest('.js-section-item').dataset.stationId;

      try {
        await Apis.sections.delete({ lineId, stationId });
        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof HTTPError) {
          error.handleError();
        }

        console.error(error.message);
      }
    });
  }

  async updateSubwayState() {
    this.setState(await Apis.getStationAndLine());
  }
}

export default Section;
