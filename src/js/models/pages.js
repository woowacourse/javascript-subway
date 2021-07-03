import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';

const pages = {
  stationManager: new StationManager(),
  lineManager: new LineManager(),
  sectionManager: new SectionManager(),
};

export default pages;
