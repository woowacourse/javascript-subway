import { STATE_KEY } from "../constants";

export default class Subject {
  constructor() {
    this.observers = {
      [STATE_KEY.STATION_LIST]: [],
      [STATE_KEY.LINE_LIST]: [],
      [STATE_KEY.IS_LOGGED_IN]: [],
      [STATE_KEY.TARGET_LINE_ID]: [],
      [STATE_KEY.TARGET_SECTION_LINE_ID]: [],
      [STATE_KEY.IS_LINE_ITEM_VIEW_MODE]: [],
      [STATE_KEY.IS_SECTION_ITEM_VIEW_MODE]: [],
    };
  }

  subscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = [...newObservers[key], observer];

    this.observers = newObservers;
  }

  unsubscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = newObservers[key].filter(currentObserver => currentObserver !== observer);

    this.observers = newObservers;
  }

  notify(key) {
    if (this.observers[key].length > 0) {
      this.observers[key].forEach(observer => observer.renderComponent());
    }
  }

  notifyAll() {
    Object.keys(this.observers).forEach(key => {
      if (this.observers[key].length > 0) {
        this.observers[key].forEach(observer => observer.renderComponent());
      }
    });
  }
}
