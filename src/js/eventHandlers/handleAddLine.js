// import { requestAddLine } from '../services/line';

import { LINE } from '../constants/alertMessage';
import { STATION_AMOUNT } from '../constants/service';
import station from '../store/station';

const handleAddLine = async event => {
  event.preventDefault();

  if (station.length < STATION_AMOUNT.MIN) {
    alert(LINE.TOO_FEW_STATION);
    return;
  }

  const {
    ['subway-line-name']: subwayLineName,
    ['departure-time']: departureTime,
    ['arrival-time']: arrivalTime,
    ['interval-time']: intervalTime,
    ['subway-line-color']: subwayLineColor,
  } = event.target.elements;

  console.log('subwayLineName: ', subwayLineName);
  console.log('departureTime: ', departureTime);
  console.log('arrivalTime:', arrivalTime);
  console.log(('intervalTime: ', intervalTime));
  console.log(('subwayLineColor: ', subwayLineColor));
  // requestAddLine();
};

export default handleAddLine;
