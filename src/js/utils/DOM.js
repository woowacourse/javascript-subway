// eslint-disable-next-line consistent-return
export const $ = (selector, $target = document) => {
  try {
    const $selectedElement = $target.querySelector(selector);

    if (!$selectedElement) {
      throw new Error("Cannot find element");
    }

    return $selectedElement;
  } catch (e) {
    console.error(e);
  }
};

// eslint-disable-next-line consistent-return
export const $$ = (selector, $target = document) => {
  try {
    const $selectedElements = $target.querySelectorAll(selector);

    if ($selectedElements.length === 0) {
      throw new Error("Cannot find elements");
    }

    return $selectedElements;
  } catch (e) {
    console.error(e);
  }
};

export const removeAllChildren = ($target) => {
  Array.from($target.children).forEach(($child) => $child.remove());
};

export const showElement = ($target) => {
  $target.classList.remove("d-none");
};

export const hideElement = ($target) => {
  $target.classList.add("d-none");
};

export const changeCheckMessageColor = ($target, isChecked) => {
  if (isChecked) {
    $target.classList.remove("text-red");
    $target.classList.add("text-green");
  } else {
    $target.classList.remove("text-green");
    $target.classList.add("text-red");
  }
};

export const blinkElement = ($target) => {
  $target.classList.add("blink-red");

  setTimeout(() => {
    $target.classList.remove("blink-red");
  }, 2000);
};
