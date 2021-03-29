import Component from "./common/Component.js";

import {
  TOKEN_STORAGE_KEY,
  STATION_NAME_MIN_LENGTH,
  STATION_NAME_MAX_LENGTH,
  STATION_LIST_ITEM_BORDER_HEIGHT,
  SPACE_REG_EXP,
} from "../constants/general.js";

import { $, $$ } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import {
  addStationAPI,
  deleteStationAPI,
  getStationsAPI,
} from "../APIs/subwayAPI.js";
import snackbar from "../utils/snackbar.js";
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from "../constants/messages.js";
import { StationModifyModal } from "./StationModifyModal.js";

const createStationListItem = (station) => {
  return `
    <li
      data-station-id="${station.id}"
      data-station-name="${station.name}"
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
  constructor({ $parent, setIsLoggedIn }) {
    super($parent);
    this.setIsLoggedIn = setIsLoggedIn;
    this.stationModifyModal = new StationModifyModal({
      modifyStationName: this.modifyStationName.bind(this),
    });

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
    $(".js-station-list", this.innerElement).addEventListener(
      "click",
      this.onClickStationList.bind(this)
    );
  }

  async onAddStation(event) {
    event.preventDefault();

    const { target } = event;
    const $stationList = $(".js-station-list", this.innerElement);
    const stationName = target.elements["station-name"].value.replace(
      SPACE_REG_EXP,
      ""
    );

    const isValidNameLength =
      stationName.length >= STATION_NAME_MIN_LENGTH &&
      stationName.length <= STATION_NAME_MAX_LENGTH;

    if (!isValidNameLength) {
      snackbar.show(ERROR_MESSAGE.STATION_NAME_LENGTH);
      target.reset();

      return;
    }

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, station, message } = await addStationAPI(
      stationName,
      accessToken
    );

    snackbar.show(message);

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

    target.elements["station-name"].value = stationName;
  }

  async deleteStation(stationId) {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_STATION)) {
      return;
    }

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const deleteResult = await deleteStationAPI(stationId, accessToken);

    snackbar.show(deleteResult.message);

    if (!deleteResult.isSucceeded) {
      return;
    }

    $(
      `.js-station-list > li[data-station-id="${stationId}"]`,
      this.innerElement
    ).remove();

    this.render();
  }

  modifyStationName(stationId, newStationName) {
    const $target = $(`[data-station-id="${stationId}"]`, this.innerElement);

    $target.dataset.stationName = newStationName;
    $(".js-station-name", $target).textContent = newStationName;
  }

  onClickStationList({ target }) {
    if (target.classList.contains("js-delete-btn")) {
      this.deleteStation(target.closest("li").dataset.stationId);

      return;
    }

    if (target.classList.contains("js-modify-btn")) {
      const $li = target.closest("li");
      this.stationModifyModal.open({
        stationId: $li.dataset.stationId,
        prevStationName: $li.dataset.stationName,
      });
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
    this.stationModifyModal.render();
  }

  render() {
    super.render();
  }
}
