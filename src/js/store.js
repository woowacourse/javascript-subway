import UserAuth from './models/UserAuth';

export default class Store {
  constructor() {
    this._subscribers = [];
    this._isLoggedIn = false;
    this._state = {
      user: new UserAuth(),
    };
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(state) {
    this._isLoggedIn = state;
  }

  get userSession() {
    return this._userSession;
  }

  updateLoggedIn(state) {
    this._isLoggedIn = state;
    this.notify();
  }

  updateUserName(name) {
    this._state.user.name = name;
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  notify() {
    this._subscribers.forEach((subscriber) => subscriber.update());
  }
}
