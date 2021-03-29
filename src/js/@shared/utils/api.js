export const request = async (url, option = {}) => {
  try {
    const response = await fetch(url, option);

    if (!response.ok) throw new Error(await response.text());

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
