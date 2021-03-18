export const request = async ({ uri, method, type }) => {
  try {
    const response = await fetch(uri, { method });
    const result = response[type]();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return result;
  } catch (e) {
    console.error(e);
  }
};
