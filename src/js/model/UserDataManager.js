export default class UserDataManager {
  static instance;

  constructor() {
    if (UserDataManager.instance) return UserDataManager.instance;

    this.stations = [
      { name: '강남', id: 1 },
      { name: '서초', id: 2 },
      { name: '신세', id: 28 },
      { name: '한탄', id: 30 },
      { name: '우울', id: 18 },
    ];
    this.lines = [
      {
        id: 1,
        name: '신분당선',
        color: 'bg-red-600',
        stations: [
          {
            id: 1,
            name: '강남역',
            createdDate: '2021-03-27T06:55:18.055601',
            modifiedDate: '2021-03-27T06:55:18.055601',
          },
          {
            id: 2,
            name: '광교역',
            createdDate: '2021-03-27T06:55:18.121414',
            modifiedDate: '2021-03-27T06:55:18.121414',
          },
        ],
        sections: [
          {
            upStation: {
              id: 1,
              name: '강남역',
              createdDate: '2021-03-27T06:55:18.055601',
              modifiedDate: '2021-03-27T06:55:18.055601',
            },
            downStation: {
              id: 2,
              name: '광교역',
              createdDate: '2021-03-27T06:55:18.121414',
              modifiedDate: '2021-03-27T06:55:18.121414',
            },
            distance: 10,
            duration: 10,
          },
        ],
        createdDate: '2021-03-27T06:55:18.212596',
        modifiedDate: '2021-03-27T06:55:18.212596',
      },
    ];
    this.sections = [];

    UserDataManager.instance = this;
  }

  setStationData(stationData) {
    if (Array.isArray(stationData)) {
      this.stations = stationData;
      return;
    }

    this.stations = [...this.stations, stationData];
  }

  setLineData(lineData) {
    if (Array.isArray(lineData)) {
      this.lines = lineData;
      return;
    }

    this.lines = [...this.lines, lineData];
  }

  getStationId(stationName) {
    return this.stations.find((station) => station.name === stationName).id;
  }

  editStationName(oldStationName, newStationName) {
    this.stations.find((station) => station.name === oldStationName).name = newStationName;
  }

  removeStation(stationName) {
    this.stations = this.stations.filter((station) => station.name !== stationName);
  }
}
