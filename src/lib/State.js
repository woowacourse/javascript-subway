import Subject from './Subject.js';

export default class State extends Subject {
  constructor() {
    super();
    this.state = {
      stationList: ['사당', '방배'],
      lineList: ['1호선', '2호선'],
    };
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return Object.assign({}, this.state);
  }
}
