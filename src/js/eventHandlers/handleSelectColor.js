import { updateLineColorDot } from '../viewController/lines';

const handleSelectColor = ({ target }) => {
  if (!target.classList.contains('js-color-option')) return;
  updateLineColorDot(target.closest('.modal'), target.dataset.color);
};

export default handleSelectColor;
