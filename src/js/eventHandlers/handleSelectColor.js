import { setLineColorDot } from '../viewController/lineAddModal';

const handleSelectColor = ({ target }) => {
  if (!target.classList.contains('js-color-option')) return;
  setLineColorDot(target.dataset.color);
};

export default handleSelectColor;
