import TEMPLATE from './template.js';
import { $ } from '../../../utils/index.js';

const $main = $('main');

// eslint-disable-next-line import/prefer-default-export
export const renderSignUp = () => {
  $main.innerHTML = TEMPLATE;
};
