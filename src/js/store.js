import UserAuth from './models/UserAuth';

export default class Store {
  constructor() {
    this._subscribers = [];
    this._isLoggedIn = false;
    this._state = {
      user: new UserAuth(),
      stations: [],
      lines: [],
    };
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(state) {
    this._isLoggedIn = state;
  }

  get userAuth() {
    return this._state.user;
  }

  get stations() {
    const sortedStations = this._state.stations.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));

    return sortedStations;
  }

  set stations(stations) {
    this._state.stations = stations;
  }

  set userName(name) {
    this._state.user.name = name;
  }

  get lines() {
    const sortedLines = this._state.lines.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));

    return sortedLines;
  }

  set lines(lines) {
    this._state.lines = lines;
  }

  updateLoggedIn(state) {
    this._isLoggedIn = state;
    this.notify();
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  async notify() {
    this._subscribers.forEach(async (subscriber) => await subscriber.update());
  }
}
