export const request = async (url, option = {}) => {
  try {
    const response = await fetch(url, option);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
