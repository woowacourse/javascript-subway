import { PAGE_TITLE, STORAGE } from '../../constants';
import { initSections } from '../../models/model';
import { getLocalStorageItem } from '../../utils/storage';
import { subwayMapTemplate } from './subwayMapTemplate';

class SubwayMap {
  #sections;
  #userAccessToken;

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#sections = await initSections(this.#userAccessToken);
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.MAP,
      contents: {
        main: subwayMapTemplate(this.#sections),
      },
    };
  }
}

export default SubwayMap;
