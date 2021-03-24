import { updateLineColorDot } from '../viewController/lineAddModal';

const handleSelectColor = ({ target }) => {
  if (!target.classList.contains('js-color-option')) return;
  updateLineColorDot(target.dataset.color);
};

export default handleSelectColor;
