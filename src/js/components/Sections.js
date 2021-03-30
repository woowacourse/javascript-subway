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
    this.sectionsModal = new SectionsModal();
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
      this.sectionsModal.open.bind(this.sectionsModal)
    );
    $(".js-line-select", this.innerElement).addEventListener(
      "change",
      this.onChangeSelectedLine.bind(this)
    );
  }

  onChangeSelectedLine({ target }) {
    // eslint-disable-next-line no-param-reassign
    target.className = `js-line-select ${this.lines[target.value].color}`;
    this.changeStationList(target.value);

    this.render();
  }

  changeStationList(lineId) {
    const $stationList = $(".js-station-list", this.innerElement);

    removeAllChildren($stationList);
    $stationList.insertAdjacentHTML(
      "beforeend",
      this.lines[lineId].stations.map(createStationListItem).join("")
    );
  }

  async loadPage() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const loadedLines = await getLinesAPI(accessToken);
    const loadedStations = await getStationsAPI(accessToken);
    const lines = {};

    if (!loadedLines.isSucceeded || !loadedStations.isSucceeded) {
      snackbar.show("안됨 ㅜ");

      return;
    }

    // eslint-disable-next-line no-return-assign
    loadedLines.lines.forEach((line) => (lines[line.id] = line));
    this.lines = lines;
    this.stations = loadedStations.stations;

    const $lineSelect = $(".js-line-select", this.innerElement);

    removeAllChildren($lineSelect);
    $lineSelect.className = `js-line-select ${loadedLines.lines[0].color}`;
    $lineSelect.insertAdjacentHTML(
      "beforeend",
      loadedLines.lines.map(createLineSelectOption).join("")
    );
    this.changeStationList(loadedLines.lines[0].id);

    this.render();
    this.sectionsModal.render();
  }

  render() {
    super.render();
  }
}
