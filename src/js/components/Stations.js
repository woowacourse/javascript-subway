import Component from "./common/Component.js";

import { PAGE_URLS, PAGE_KEYS } from "../constants/pages.js";
import {
  TOKEN_STORAGE_KEY,
  STATION_NAME_MIN_LENGTH,
  STATION_NAME_MAX_LENGTH,
} from "../constants/general.js";

import { $ } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { getStationsAPI } from "../APIs/subwayAPI.js";

const createStationListItem = (station) => {
  return `
    <li
      data-station-id="${station.id}"
      class="station-list-item d-flex items-center py-3 border-b-gray"
      >
      <span class="w-100 pl-2">${station.name}</span>
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
  `;
};
export default class Stations extends Component {
  constructor({ $parent, pageRouter }) {
    super($parent);
    this.pageRouter = pageRouter;

    this.initContent();

    this.$stationList = $(".js-station-list", this.innerElement);
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
              minlength="${STATION_NAME_MIN_LENGTH}"
              maxlength="${STATION_NAME_MAX_LENGTH}"
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
        <ul class="js-station-list mt-3 pl-0"></ul>
      </div>
    `;

    super.initContent(template);
  }

  async loadPage() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    if (accessToken === "") {
      this.pageRouter.movePage(PAGE_URLS[PAGE_KEYS.LOGIN]);
    }

    const loadResult = await getStationsAPI(accessToken);
    if (!loadResult.isSucceeded) {
      this.pageRouter.movePage(PAGE_URLS[PAGE_KEYS.LOGIN]);
    }

    this.$stationList.innerHTML = loadResult.stations.reduce(
      (stationListHTML, station) =>
        `${stationListHTML}\n${createStationListItem(station)}`,
      ""
    );

    this.render();
  }

  render() {
    super.render();
  }
}
