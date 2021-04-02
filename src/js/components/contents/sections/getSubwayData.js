import requestReadStation from '../stations/read.js';
import requestReadLine from '../lines/read.js';

const NO_DISTANCE = 0;
const NO_DURATION = 0;

export default async function getSubwayData(selectedLineId) {
  try {
    const totalLineList = await requestReadLine();
    const totalStationList = await requestReadStation();
    const lineId = selectedLineId ?? totalLineList[0].id;
    const sectionListOfLine = getSectionList(totalLineList, lineId);
    const stationOptionList = getStationOptionList(totalStationList, sectionListOfLine);

    return { totalLineList, sectionListOfLine, stationOptionList, lineId };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return { totalLineList: [], sectionListOfLine: [], stationOptionList: [] };
  }
}

/*
  [
    { name: '', id: '', '다음역까지의 distance': 1, '다음역까지의 duration': 1 },
    { name: '', id: '', '다음역까지의 distance': 0, '다음역까지의 duration': 0 },
  ]
*/
function getSectionList(totalLineList, selectedLineId) {
  const { stations, sections } = totalLineList.find((line) => line.id === selectedLineId);
  const stationOrder = Object.fromEntries(stations.map(({ id }, index) => [id, index]));
  const lastStation = stations[stations.length - 1];
  const sectionList = [
    ...sections.map(({ upStation: { id, name }, distance, duration }) => ({
      id,
      name,
      distance,
      duration,
    })),
    {
      id: lastStation.id,
      name: lastStation.name,
      distance: NO_DISTANCE,
      duration: NO_DURATION,
    },
  ];

  return sectionList.sort((sectionA, sectionB) => stationOrder[sectionA.id] - stationOrder[sectionB.id]);
}

function getStationOptionList(totalStationList, sectionList) {
  const stationIdOfLine = sectionList.map(({ id }) => id);

  return totalStationList.filter(({ id }) => !stationIdOfLine.includes(id));
}
