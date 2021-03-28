import { PATH } from '../constants/url.js';
import Component from './Component.js';

class FetchComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.subwayState = {
      stations: [],
      lines: [],
    };

    this.subway = {
      state: this.subwayState,
      update: this.updateSubwayState,
    };

    this.updateSubwayState();
  }

  // TODO: 조회할 때 역 노선 둘다 필요하지 않은 상황임

  async updateSubwayState() {
    const [stations, lines] = await Promise.all(
      this.fetchGetItemList(PATH.STATIONS),
      this.fetchGetItemList(PATH.LINES)
    );

    setSubwayState({ stations, lines });
  }

  async fetchGetItemList(path) {
    const accessToken = this.stateManagers.accessToken.getToken();
    try {
      const params = getFetchParams({ path, accessToken });
      const response = await request.get(params);

      if (!response.ok) throw Error(await response.text());

      const itemList = await response.json();
      return itemList;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  setSubwayState({ stations, lines }) {
    this.subwayState = { stations, lines };
    this.render();
    this.addEventListeners();
  }
}

export default FetchComponent;
