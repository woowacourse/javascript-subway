class StationManager {
  constructor() {
    this.stations = {
      1: {
        id: 1,
        name: '잠실',
      },
      21: {
        id: 21,
        name: '사당',
      },
      3: {
        id: 3,
        name: '가락시장',
      },
      4: {
        id: 4,
        name: '혜화',
      },
    };
  }
  init() {
    this.getAllStations();
  }

  addStation(stationName) {
    // 1. fetch
    const newStation = {
      id: 1234,
      name: stationName,
    };

    // 2. 본인 stations에 push
    this.stations[newStation.id] = newStation;
  }

  deleteStation(stationId) {
    delete this.stations[stationId];
  }

  modifyStation(id, name) {
    // TODO: fetch
    this.stations[id] = { id, name };
  }

  getAllStations() {
    // this.stations = fetch()
    return this.stations;
  }
}

export default StationManager;
