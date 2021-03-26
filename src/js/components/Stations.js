import Component from "./common/Component.js";

import {
  TOKEN_STORAGE_KEY,
  STATION_NAME_MIN_LENGTH,
  STATION_NAME_MAX_LENGTH,
  STATION_LIST_ITEM_BORDER_HEIGHT,
} from "../constants/general.js";

import { $, $$ } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { addStationAPI, getStationsAPI } from "../APIs/subwayAPI.js";
import snackbar from "../utils/snackbar.js";
import { ERROR_MESSAGE } from "../constants/messages.js";

const createStationListItem = (station) => {
  return `
    <li
      data-station-id="${station.id}"
      class="station-list-item d-flex items-center"
      >
      <span class="js-station-name w-100">${station.name}</span>
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
  constructor({ $parent, pageRouter, setIsLoggedIn }) {
    super($parent);
    this.pageRouter = pageRouter;
    this.setIsLoggedIn = setIsLoggedIn;

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
              name="station-name"
              class="js-station-name input-field"
              placeholder="역 이름"
              minlength="${STATION_NAME_MIN_LENGTH}"
              maxlength="${STATION_NAME_MAX_LENGTH}"
              required
            />
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 ml-2 w-30"
            >
              확인
            </button>
          </div>
        </form>
        <ul class="js-station-list station-list mt-3 pl-0"></ul>
      </div>
    `;

    super.initContent(template);
    this.attachEvents();
  }

  attachEvents() {
    $("form", this.innerElement).addEventListener(
      "submit",
      this.onAddStation.bind(this)
    );
  }

  async onAddStation(event) {
    event.preventDefault();

    const { target } = event;
    const $stationList = $(".js-station-list", this.innerElement);
    const stationName = target.elements["station-name"].value;
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, station, message } = await addStationAPI(
      stationName,
      accessToken
    );

    if (isSucceeded) {
      $stationList.insertAdjacentHTML(
        "beforeend",
        createStationListItem(station)
      );
      target.reset();
      this.render();
      target.elements["station-name"].focus();

      return;
    }

    snackbar.show(message);
    if (message === ERROR_MESSAGE.DUPLICATED_STATION) {
      const $stationListItems = $$("li", $stationList);
      const duplicatedStationIndex = Array.from($stationListItems).findIndex(
        ($li) => $(".js-station-name", $li).textContent === stationName
      );

      $stationList.scrollTo(
        0,
        ($stationListItems[0].clientHeight + STATION_LIST_ITEM_BORDER_HEIGHT) *
          duplicatedStationIndex
      );
      $stationListItems[duplicatedStationIndex].classList.add("blink-red");

      setTimeout(() => {
        $stationListItems[duplicatedStationIndex].classList.remove("blink-red");
      }, 2000);
    }
  }

  async loadPage() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const loadResult = await getStationsAPI(accessToken);

    this.setIsLoggedIn(loadResult.isSucceeded);
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
