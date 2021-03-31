import { Component } from '../../@shared/models/Component';
import { STATE_KEY } from '../constants';
import { store } from '../models/store';
import { subwayView } from '../views';

export class MapDisplay extends Component {
  setup() {
    store[STATE_KEY.LINES].subscribe(this.updateLines.bind(this));
  }

  updateLines(lines) {
    subwayView.renderLineButtonList(lines);
  }
}
