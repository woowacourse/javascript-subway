class Line {
  constructor({ id, name, color, stations, sections }) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._stations = stations;
    this._sections = sections;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get color() {
    return this._color;
  }

  get stations() {
    return this._stations;
  }

  get sections() {
    return this._sections;
  }
}

export default Line;
