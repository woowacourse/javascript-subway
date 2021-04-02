import Component from "./common/Component.js";
import SectionsModal from "./SectionsModal.js";
import {
  deleteSectionAPI,
  getLinesAPI,
  getStationsAPI,
} from "../APIs/subway/index.js";

import { $, removeAllChildren } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import snackbar from "../utils/snackbar.js";

import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { createStationListItem } from "../constants/template.js";
import { CONFIRM_MESSAGE } from "../constants/messages.js";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages.js";

const createLineSelectOption = (lineData) => {
  const { id, name } = lineData;

  return `
    <option value="${id}">${name}</option>
  `;
};

export default class Sections extends Component {
  constructor({ $parent, setPageState }) {
    super($parent);
    this.setPageState = setPageState;
    this.sectionsModal = new SectionsModal({
      addSection: this.addSection.bind(this),
    });
    this.lines = {};
    this.stations = [];

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            class="js-add-section add-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <select class="js-line-select"></select>
        </form>
        <ul class="js-station-list mt-3 pl-0"></ul>
      </div>
    `;

    super.initContent(template);
    this.attachEvent();
  }

  attachEvent() {
    $(".js-add-section", this.innerElement).addEventListener(
      "click",
      this.onOpenSectionModal.bind(this)
    );
    $(".js-line-select", this.innerElement).addEventListener(
      "change",
      this.onChangeSelectedLine.bind(this)
    );
    $(".js-station-list", this.innerElement).addEventListener(
      "click",
      this.onClickStationList.bind(this)
    );
  }

  onOpenSectionModal() {
    const lineId = $(".js-line-select", this.innerElement).value;
    const lineName = this.lines[lineId].name;

    this.sectionsModal.open({
      lineId,
      lineName,
      stations: this.stations,
    });
  }

  onChangeSelectedLine({ target }) {
    // eslint-disable-next-line no-param-reassign
    target.className = `js-line-select ${this.lines[target.value].color}`;
    this.updateStationListDOM(target.value);

    this.render();
  }

  onClickStationList({ target }) {
    if (!target.classList.contains("js-delete-btn")) {
      return;
    }

    if (window.confirm(CONFIRM_MESSAGE.DELETE_SECTION)) {
      this.deleteSection({
        lineId: $(".js-line-select", this.innerElement).value,
        stationId: target.closest("li").dataset.stationId,
      });
    }
  }

  async addSection(lineId) {
    await this.setData();
    this.updateStationListDOM(lineId);
    this.render();
  }

  async deleteSection({ lineId, stationId }) {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, message } = await deleteSectionAPI(
      lineId,
      stationId,
      accessToken
    );

    snackbar.show(message);

    if (!isSucceeded) {
      return;
    }

    await this.setData();
    this.updateStationListDOM(lineId);
    this.render();
  }

  async setData() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const loadedLines = await getLinesAPI(accessToken);
    const loadedStations = await getStationsAPI(accessToken);
    const isLoadSucceeded =
      loadedLines.isSucceeded && loadedStations.isSucceeded;

    this.setPageState({
      isLoggedIn: isLoadSucceeded,
      pageURL: isLoadSucceeded
        ? PAGE_URLS[PAGE_KEYS.SECTIONS]
        : PAGE_URLS[PAGE_KEYS.LOGIN],
    });

    const lines = {};
    // eslint-disable-next-line no-return-assign
    loadedLines.lines.forEach((line) => (lines[line.id] = line));

    this.lines = lines;
    this.stations = loadedStations.stations;
  }

  resetLineSelectDOM() {
    const $lineSelect = $(".js-line-select", this.innerElement);

    removeAllChildren($lineSelect);
    $lineSelect.className = "js-line-select";
  }

  updateLineSelectDOM(selectedLine) {
    this.resetLineSelectDOM();

    if (!selectedLine) {
      this.render();

      return;
    }

    const $lineSelect = $(".js-line-select", this.innerElement);
    $lineSelect.insertAdjacentHTML(
      "beforeend",
      Object.values(this.lines).map(createLineSelectOption).join("")
    );
    $lineSelect.className = `js-line-select ${selectedLine.color}`;
  }

  updateStationListDOM(lineId) {
    const $stationList = $(".js-station-list", this.innerElement);
    removeAllChildren($stationList);

    $stationList.insertAdjacentHTML(
      "beforeend",
      this.lines[lineId].stations
        .map((station) => createStationListItem(station, false))
        .join("")
    );
  }

  async loadPage() {
    await this.setData();

    this.updateLineSelectDOM(Object.values(this.lines)[0]);
    this.updateStationListDOM(Object.keys(this.lines)[0]);

    this.render();
    this.sectionsModal.render();
  }

  render() {
    super.render();
  }
}
