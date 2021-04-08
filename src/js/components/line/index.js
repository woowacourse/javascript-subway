import { getSubwayState } from '../../api/apis.js';
import getFetchParams from '../../api/getFetchParams.js';
import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/request.js';
import mainTemplate from './template/main.js';
import { lineFormDetail } from './template/modal.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import Modal from './modal.js';
import sorted from '../../utils/sort.js';
class Line extends Component {
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
    this.order = false;
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    this.createLineEvent();
    this.editOrDeleteLineEvent();
    this.sortLineItems();
  }

  createLineEvent() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
      this.childComponents.modal.clearForm();
      this.childComponents.modal.requestType = 'post';
      $('.js-line-detail-container').innerHTML = lineFormDetail(
        this.state.stations
      );
    });
  }

  editOrDeleteLineEvent() {
    // edit이라는 독자적인 행위인데 create에 영향을 받음.
    // create도 마찬가지 .
    // 지우고 그려줘야 한다. -> 이상하네.
    // 이걸 해결해야 함.
    // 이게 해결되지 못한다면 모달을 두개 나눠야 하는 편이 좋다.
    // 이걸 가장 간단하게 해결하는 방법이 모달 2개로 만드는 것.
    // 하나로 해도 해결을 할 수는 있겠지만 .. ㅎㅎㅎ
    // Template 안에서 해결할 수 있는 편이 좋다.

    $('.js-line-list').addEventListener('click', async ({ target }) => {
      // 노선 관리 -- Edit
      if (target.classList.contains('js-line-item__edit')) {
        this.childComponents.modal.show();
        this.childComponents.modal.requestType = 'put';
        $('.js-line-form__detail')?.remove();

        const id = target.closest('.js-line-item').dataset.id;
        this.childComponents.modal.setTargetId(id);
      }

      // 노선 관리 -- Delete
      if (target.classList.contains('js-line-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const id = target.closest('.js-line-item').dataset.id;
        const accessToken = this.stateManagers.accessToken.getToken();
        const params = getFetchParams({
          path: `${PATH.LINES}/${id}`,
          accessToken,
        });
        try {
          const response = await request.delete(params);

          if (!response.ok) throw Error(await response.text());
          this.updateSubwayState();
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  }

  sortLineItems() {
    $('.js-line-item__sort').addEventListener('click', () => {
      this.order = !this.order;

      if (this.order) {
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
//생성을 하는 순간 private tab들은 App들은 access Token이 없음. 그래서 요청이 불가.

export default Line;
