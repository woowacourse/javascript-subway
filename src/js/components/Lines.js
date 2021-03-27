import Component from "./common/Component.js";
import LinesModal from "./LinesModal.js";
import { deleteLineAPI } from "../APIs/subwayAPI.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { CONFIRM_MESSAGE } from "../constants/messages.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { $ } from "../utils/DOM.js";
import snackbar from "../utils/snackbar.js";

export default class Lines extends Component {
  constructor({ $parent }) {
    super($parent);
    this.linesModal = new LinesModal();

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button
            type="button"
            class="js-add-line-btn add-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            노선 추가
          </button>
        </div>
        <ul class="js-line-list mt-3 pl-0">
          <li class="d-flex items-center py-2 relative border-b-gray">
            <span class="subway-line-color-dot bg-blue-400"></span>
            <span class="w-100 pl-6 subway-line-list-item-name">1호선</span>
            <button
              type="button"
              class="js-modify-line-btn bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="js-delete-line-btn bg-gray-50 text-gray-500 text-sm"
            >
              삭제
            </button>
          </li>
        </ul>
      </div>
    `;

    super.initContent(template);
    this.attachEvent();
  }

  async deleteLine(lineId) {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE)) {
      return;
    }

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const deleteResult = await deleteLineAPI(lineId, accessToken);

    snackbar.show(deleteResult.message);

    if (!deleteResult.isSucceeded) {
      return;
    }

    $(
      `.js-line-list > li[data-line-id="${lineId}"]`,
      this.innerElement
    ).remove();

    this.render();
  }

  onClickLineList({ target }) {
    if (target.classList.contains("js-delete-line-btn")) {
      this.deleteLine(target.closest("li").dataset.lineId);
    }
  }

  attachEvent() {
    $(".js-add-line-btn", this.innerElement).addEventListener(
      "click",
      this.linesModal.open.bind(this.linesModal)
    );
    $("js-line-list", this.innerElement).addEventListener(
      "click",
      this.onClickLineList.bind(this)
    );
  }

  render() {
    super.render();
    this.linesModal.render();
  }
}
