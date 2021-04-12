/* eslint-disable no-new */
const dispatchFormData = (event) => {
  event.preventDefault();
  new FormData(event.target);
};

const toStringFromFormData = (formData) => JSON.stringify(Object.fromEntries(formData.entries()));

export { dispatchFormData, toStringFromFormData };
