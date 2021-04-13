const hexToRgbArray = hexColor => {
  const hexR = parseInt(hexColor.slice(1, 3), 16);
  const hexG = parseInt(hexColor.slice(3, 5), 16);
  const hexB = parseInt(hexColor.slice(5, 7), 16);

  return [hexR, hexG, hexB];
};

const isHexColor = colorCode => colorCode[0] === '#' && colorCode.length === 7;

// ITU-R BT.709 formula
const getLuma = ([red, green, blue]) => 0.2126 * red + 0.7152 * green + 0.0722 * blue;

const getTextColorByBackgroundColor = backgroundColor => {
  const rgb = isHexColor(backgroundColor)
    ? hexToRgbArray(backgroundColor)
    : backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1);

  const luma = getLuma(rgb);

  return luma < 255 / 2 ? 'white' : 'black';
};

export const setSelectElementColor = ($target, color) => {
  if ($target.tagName !== 'SELECT') return;

  $target.classList.remove(...$target.classList);
  $target.classList.add(color);

  const rgb = window.getComputedStyle($target, null).backgroundColor;
  $target.style.color = getTextColorByBackgroundColor(rgb);
};
