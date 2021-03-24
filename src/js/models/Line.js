import { Station } from './Station';

export default class Line {
  constructor({ id, name, color, stations, createdDate, modifiedDate }) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._stations = stations.map((station) => new Station(...station));
    this._createdDate = createdDate;
    this._modifiedDate = modifiedDate;
  }
}
