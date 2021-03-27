import { $ } from '../../utils/dom';
import store from '../../store';
import { modalCloseEventInit } from '../../utils/modal';
import stationsPageTemplate from './template';
import handleEditStation from './eventHandlers/handleEditStation';
import handleStationStatus from './eventHandlers/handleStationStatus';
import handleAddStation from './eventHandlers/handleAddStation';

const mountStations = () => {
  $('#route-container').innerHTML = stationsPageTemplate(store.station.get());

  $('#station-form').addEventListener('submit', handleAddStation);
  $('#station-list').addEventListener('click', handleStationStatus);
  $('#station-name-edit-form').addEventListener('submit', handleEditStation);

  modalCloseEventInit('#station-name-edit-modal');
};

export default mountStations;
