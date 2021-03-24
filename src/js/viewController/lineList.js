import line from '../store/line';
import { lineListItemTemplate } from '../templates/lines';
import { $, appendChildTemplate } from '../utils/dom';

export const addLine = ({ id, name, color, stations }) => {
  line.add({ id, name, color, stations });
  appendChildTemplate($('.js-line-list'), lineListItemTemplate({ id, name, color }));
};
