import { isObject, sessionStore } from '../utils/utils.js';
import { ALERT_MESSAGE, SESSION_STORAGE_KEY, STATE_KEY, SETTINGS } from '../constants.js';
import { requestStationList } from '../api/station.js';
import { requestLineList } from '../api/line.js';
import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      [STATE_KEY.USER_NAME]: SETTINGS.NOT_INITIATED_NAME,
      [STATE_KEY.STATION_LIST]: [],
      [STATE_KEY.LINE_LIST]: [],
      [STATE_KEY.IS_LOGGED_IN]: false,
      [STATE_KEY.TARGET_LINE_ID]: SETTINGS.NOT_INITIATED_NUMBER,
      [STATE_KEY.TARGET_SECTION_LINE_ID]: SETTINGS.NOT_INITIATED_NUMBER,
      [STATE_KEY.TARGET_MENU]: SETTINGS.NOT_INITIATED_MENU,
    };
  }

  update(key, data = []) {
    this.#state = { ...this.#state, [key]: data };
    this.notify(key);
  }

  updateAll(data = []) {

    this.#state = { ...this.#state, data };
    this.notifyAll();
  }
  
  get(key) {
    if (!key) return;
    if (Array.isArray(this.#state[key])) {
      return [...this.#state[key]];
    }
    if (isObject(this.#state[key])) {
      return { ...this.#state[key] };
    }
    return this.#state[key];
  }
  
  getAll() {
    return Object.assign({}, this.#state);
  }

  initState() {
    if (!sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)) return;
    this.#state[STATE_KEY.IS_LOGGED_IN] = true;
    this.#fetchStationList()
      .then(stationList => {
        this.#state[STATE_KEY.STATION_LIST] = stationList;
      })
      .catch(error => {
        console.log(error);
        alert(ALERT_MESSAGE.STATION_GET_FAILED);
      });
    
      this.#fetchLineList()
      .then(lineList => {
        if (lineList.length === 0) return;
        this.#state[STATE_KEY.LINE_LIST] = lineList;
        const [firstLine] = lineList;
        this.#state[STATE_KEY.TARGET_SECTION_LINE_ID] = firstLine.id;
      })
      .catch(error => {
        console.log(error);
        alert(ALERT_MESSAGE.LINE_GET_FAILED);
      });
  }

  async #fetchStationList() {
    const stationList = await requestStationList();
    return stationList.map(stationItem => ({ id: stationItem.id, name: stationItem.name }));
  }

  async #fetchLineList() {
    const lineList = await requestLineList();
    return lineList.map(lineItem => ({
      id: lineItem.id,
      name: lineItem.name,
      color: lineItem.color,
      stations: lineItem.stations,
      sections: lineItem.sections,
    }));
  }
}
