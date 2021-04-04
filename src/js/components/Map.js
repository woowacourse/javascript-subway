import Component from "./common/Component";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { getLinesAPI } from "../APIs/subwayAPI.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages.js";
import { $, removeAllChildren } from "../utils/DOM.js";

const createSectionTemplate = (station, section = {}, color) => {
  return `
    <li class="map-station"><span class="${color}"></span>${station.name}</li>
    ${
      section.distance
        ? `<li class="map-section-info">
      시간 : ${section.duration} / 거리 : ${section.distance}
    </li>`
        : ""
    }
  `;
};

const createLineTemplate = (line) => {
  const sections = {};
  line.sections.forEach((section) => {
    sections[section.upStation.name] = section;
  });

  return `
    <section class="js-map-line-wrapper">
      <h3 class="map-line-name mt-3">
        ${line.name}
      </h3>
      <ol class="map-line-list">
        ${line.stations
          .map((v) => createSectionTemplate(v, sections[v.name], line.color))
          .join("")}
      </ol>
    </section>
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
        <div class="js-map-wrapper map-wrapper ml-5"><div>
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
