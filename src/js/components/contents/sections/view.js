import TEMPLATE from './template.js';

// eslint-disable-next-line import/prefer-default-export
export const renderSections = ($parent) => {
  $parent.innerHTML = TEMPLATE;
};
