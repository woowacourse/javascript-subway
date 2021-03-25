export default class Subject {
  constructor() {
    this.observers = {
      stationList: [],
      lineList: [],
      sectionList: [],
      isLoggedIn: [],
      targetLineId: [],
      targetSectionId: [],
      isItemViewMode: [],
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
