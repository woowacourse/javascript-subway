import { updateLineColorDot } from '../viewController';

const handleSelectColor = ({ target }) => {
  if (!target.classList.contains('js-color-option')) return;
  updateLineColorDot(target.closest('.modal'), target.dataset.color);
};

export default handleSelectColor;
