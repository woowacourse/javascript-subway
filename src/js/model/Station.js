class Station {
  constructor({ id, name }) {
    this._id = id;
    this._name = name;
    this._usedLine = [];
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get usedLine() {
    return this._usedLine;
  }

  addUsedLine(lineId) {
    this._usedLine.push(lineId);
  }
}

export default Station;
