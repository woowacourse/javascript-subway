import { lineListItemTemplate } from '../templates/lines';
import { $, appendChildTemplate } from '../utils/dom';

export const addLineListItem = ({ id, name, color }) => {
  appendChildTemplate($('.js-line-list'), lineListItemTemplate({ id, name, color }));
};
