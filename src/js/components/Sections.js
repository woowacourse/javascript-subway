import Component from "./common/Component.js";
import SectionsModal from "./SectionsModal.js";
import { getLinesAPI, getStationsAPI } from "../APIs/subwayAPI.js";

import { $, removeAllChildren } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import snackbar from "../utils/snackbar.js";

import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { createStationListItem } from "../constants/template.js";

const createLineSelectOption = (lineData) => {
  const { id, name } = lineData;

  return `
    <option value="${id}">${name}</option>
  `;
};

export default class Sections extends Component {
  constructor({ $parent }) {
    super($parent);
    this.sectionsModal = new SectionsModal({
      loadPage: this.loadPage.bind(this),
    });
    this.lines = {};
    this.stations = [];

    this.initContent();

    this.$stationList = $(".js-station-list", this.innerElement);
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
    this.changeStationList(target.value);

    this.render();
  }

  changeStationList(lineId) {
    this.$stationList.insertAdjacentHTML(
      "beforeend",
      this.lines[lineId].stations
        .map((station) => createStationListItem(station, false))
        .join("")
    );
  }

  setData(loadedLines, loadedStations) {
    const lines = {};
    // eslint-disable-next-line no-return-assign
    loadedLines.lines.forEach((line) => (lines[line.id] = line));
    this.lines = lines;
    this.stations = loadedStations.stations;
  }

  resetPage() {
    const $lineSelect = $(".js-line-select", this.innerElement);

    removeAllChildren($lineSelect);
    removeAllChildren(this.$stationList);
    $lineSelect.className = "js-line-select";
  }

  renderLoadedPage(selectedLine) {
    this.resetPage();

    if (!selectedLine) {
      this.render();

      return;
    }

    const $lineSelect = $(".js-line-select", this.innerElement);
    $lineSelect.insertAdjacentHTML(
      "beforeend",
      Object.values(this.lines).map(createLineSelectOption).join("")
    );
    this.changeStationList(selectedLine.id);
    $lineSelect.className = `js-line-select ${selectedLine.color}`;

    this.render();
  }

  async loadPage(selectedLineId = "") {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const loadedLines = await getLinesAPI(accessToken);
    const loadedStations = await getStationsAPI(accessToken);

    if (!loadedLines.isSucceeded || !loadedStations.isSucceeded) {
      snackbar.show(loadedLines.message);

      return;
    }

    this.setData(loadedLines, loadedStations);

    const selectedLine =
      selectedLineId === ""
        ? Object.values(this.lines)[0]
        : this.lines[selectedLineId];
    this.renderLoadedPage(selectedLine);

    this.sectionsModal.render();
  }

  render() {
    super.render();
  }
}
