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

export const showElement = ($target) => {
  $target.classList.remove("d-none");
};

export const hideElement = ($target) => {
  $target.classList.add("d-none");
};
