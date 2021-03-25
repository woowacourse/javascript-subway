import UserAuth from './models/UserAuth';

export default class Store {
  constructor() {
    this._subscribers = [];
    this._isLoggedIn = false;
    this._state = {
      user: new UserAuth(),
      stations: [],
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

  set userAuth(accessToken) {
    return (this._state.user.accessToken = accessToken);
  }

  get stations() {
    return this._state.stations;
  }

  set stations(stations) {
    this._state.stations = stations;
  }

  set userName(name) {
    this._state.user.name = name;
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
