import Component from "./common/Component.js";

export default class Stations extends Component {
  constructor({ $parent }) {
    super($parent);

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🚉 역 관리</h2>
        </div>
        <form>
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden>
              역 이름
            </label>
            <input
              type="text"
              id="station-name"
              name="stationName"
              class="js-station-name input-field"
              placeholder="역 이름"
              required
            />
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 ml-2"
            >
              확인
            </button>
          </div>
        </form>
        <ul class="js-station-list mt-3 pl-0">
          <li class="station-list-item d-flex items-center py-3 border-b-gray">
            <span class="w-100 pl-2">사당</span>
            <button
              type="button"
              class="js-modify-btn bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="js-delete-btn bg-gray-50 text-gray-500 text-sm"
            >
              삭제
            </button>
          </li>
        </ul>
      </div>
    `;

    super.initContent(template);
  }

  render() {
    super.render();
  }
}
