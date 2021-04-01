const $ = selector => {
  const $element = document.querySelectorAll(selector);

  if ($element.length === 0) {
    console.error(`${selector}가 없습니다.`);
    return;
  }

  if ($element.length === 1) {
    return $element[0];
  }

  return $element;
};

export default $;
