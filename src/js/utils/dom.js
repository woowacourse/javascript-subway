export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const getFormData = formCollections => {
  const formData = Array.from(formCollections)
    .filter(({ name }) => name)
    .reduce(
      (result, { name, value }) => ({
        ...result,
        [name]: value,
      }),
      {},
    );

  return formData;
};
