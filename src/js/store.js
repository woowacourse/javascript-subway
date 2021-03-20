import UserAuth from './models/UserAuth';
import UserSession from './models/UserSession';

export default class Store {
  constructor() {
    this._subscribers = [];

    this._userSession = new UserSession();
    this._state = {
      user: new UserAuth(),
    };
  }

  get userSession() {
    return this._userSession;
  }

  updateLoggedIn(state) {
    this._userSession.isLoggedIn = state;
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
