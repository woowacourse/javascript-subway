import TEMPLATE from './template.js';
import { $ } from '../../../utils/index.js';

const $header = $('header');

// eslint-disable-next-line import/prefer-default-export
export const renderHeader = () => {
  $header.innerHTML = TEMPLATE;
};
