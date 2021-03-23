import LinesModal from "./LinesModal.js";
import { $ } from "../utils/DOM.js";
import Component from "./common/Component.js";

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
            class="js-add-line add-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            노선 추가
          </button>
        </div>
        <ul class="mt-3 pl-0">
          <li class="d-flex items-center py-2 relative border-b-gray">
            <span class="subway-line-color-dot bg-blue-400"></span>
            <span class="w-100 pl-6 subway-line-list-item-name"
              >1호선</span
            >
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm"
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

  attachEvent() {
    $(".js-add-line", this.innerElement).addEventListener(
      "click",
      this.linesModal.open.bind(this.linesModal)
    );
  }

  render() {
    super.render();
    this.linesModal.render();
  }
}
