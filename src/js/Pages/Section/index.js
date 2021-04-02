import { privateApis } from '../../api';
import requestStationAndLine from '../../api/requestStationAndLine';
import { UNAUTHENTICATED_LINK } from '../../constants/link';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import ExpiredTokenError from '../../error/ExpiredTokenError';
import { $ } from '../../utils/DOM';
import AddModal from './AddModal';
import { mainTemplate, sectionItem } from './template';

class Section extends Component {
  constructor({ parentNode, state, props: { goPage, setIsLogin } }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      addModal: new AddModal({
        parentNode,
        modalKey: 'section-add',
        props: {
          goPage,
          setIsLogin,
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
    };

    this.goPage = goPage;
    this.setIsLogin = setIsLogin;
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
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

      try {
        await privateApis.sections.delete({ lineId, stationId, accessToken });
        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof ExpiredTokenError) {
          this.setIsLogin(false);
          this.goPage(UNAUTHENTICATED_LINK.LOGIN);
        }

        console.error(error.message);
      }
    });
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}

export default Section;
