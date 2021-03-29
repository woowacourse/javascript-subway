const dummyData = {
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
    {
      id: 3,
      name: '선릉역',
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
    {
      upStation: {
        id: 2,
        name: '광교역',
        createdDate: '2021-03-27T06:55:18.055601',
        modifiedDate: '2021-03-27T06:55:18.055601',
      },
      downStation: {
        id: 3,
        name: '선릉역',
        createdDate: '2021-03-27T06:55:18.121414',
        modifiedDate: '2021-03-27T06:55:18.121414',
      },
      distance: 10,
      duration: 10,
    },
  ],
  createdDate: '2021-03-27T06:55:18.212596',
  modifiedDate: '2021-03-27T06:55:18.212596',
};

export default dummyData;
