// import { requestAddLine } from '../services/line';

const handleAddLine = async event => {
  event.preventDefault();
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
