class StationManager {
  constructor() {
    this.stations = {
      1: {
        id: 1,
        name: '잠실',
        createdDate: '2021-03-24T00:38:42.223329',
        modifiedDate: '2021-03-24T00:38:42.223329',
      },
      21: {
        id: 21,
        name: '사당',
        createdDate: '2021-03-24T00:38:42.223329',
        modifiedDate: '2021-03-24T00:38:42.223329',
      },
      3: {
        id: 3,
        name: '가락시장',
        createdDate: '2021-03-24T00:38:42.223329',
        modifiedDate: '2021-03-24T00:38:42.223329',
      },
      4: {
        id: 4,
        name: '혜화',
        createdDate: '2021-03-24T00:38:42.223329',
        modifiedDate: '2021-03-24T00:38:42.223329',
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
      createdDate: '2021-03-24T00:38:43.362289',
      modifiedDate: '2021-03-24T00:38:43.362289',
    };

    // 2. 본인 stations에 push
    this.stations[newStation.id] = newStation;
    console.log(this.stations);
  }

  deleteStation(stationId) {
    delete this.stations[stationId];
  }

  modifyStation() {}
  getAllStations() {
    // this.stations = fetch()
    return this.stations;
  }
}

export default StationManager;
