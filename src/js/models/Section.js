export default class Section {
  constructor({ upStation, downStation, distance, duration }) {
    this._upStation = upStation; // Station
    this._downStation = downStation; // Station
    this._distance = distance;
    this._duration = duration;
  }

  get upStation() {
    return this._upStation;
  }

  get distance() {
    return this._distance;
  }

  get duration() {
    return this._duration;
  }
}
