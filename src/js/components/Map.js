import Component from "./common/Component";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { getLinesAPI } from "../APIs/subwayAPI.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages.js";
import { $, removeAllChildren } from "../utils/DOM.js";

const createSectionTemplate = (section, index) => {
  return `
    ${index === 0 ? `<li>${section.upStation.name}</li>` : ""}
    <li>시간 : ${section.duration} / 거리 : ${section.distance}</li>
    <li>${section.downStation.name}</li>
  `;
};

const createLineTemplate = (line) => {
  return `
    <div>
      <div class="map-line-name">${line.name}</div>
      <ol class="map-line-list">
        ${line.sections.map(createSectionTemplate).join("")}
      </ol>
    </div>
  `;
};

export default class Map extends Component {
  constructor({ $parent, setPageState }) {
    super($parent);
    this.lineData = [];
    this.setPageState = setPageState;

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🗺 전체 보기</h2>
        </div>
        <div class="js-map-wrapper"><div>
      </div>
    `;

    super.initContent(template);
  }

  updateMapDOM() {
    const $mapWrapper = $(".js-map-wrapper", this.innerElement);
    const template = this.lineData.map(createLineTemplate).join("");

    removeAllChildren($mapWrapper);
    $mapWrapper.insertAdjacentHTML("beforeend", template);
  }

  async setMapData() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, lines } = await getLinesAPI(accessToken);

    this.setPageState({
      isLoggedIn: isSucceeded,
      pageURL: isSucceeded
        ? PAGE_URLS[PAGE_KEYS.MAP]
        : PAGE_URLS[PAGE_KEYS.LOGIN],
    });

    if (isSucceeded) {
      this.lineData = lines;
    }
  }

  async loadPage() {
    await this.setMapData();
    this.updateMapDOM();
    this.render();
  }
}
