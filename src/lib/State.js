import Subject from './Subject.js';

export default class State extends Subject {
  constructor() {
    super();
    this.state = {};
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }
}
