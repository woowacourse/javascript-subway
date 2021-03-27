import { SELECTOR } from './constants';
import { $ } from './utils/dom';

export const render = () => {
  const { main = '', modal = '' } = history.state.contents;
  $(SELECTOR.CONTAINER).innerHTML = main;
  $(SELECTOR.MODAL).innerHTML = modal;
};
