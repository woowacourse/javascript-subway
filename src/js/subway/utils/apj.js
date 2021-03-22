export const request = async (url, option) => {
  try {
    const response = await fetch(url, option);

    if (!response.ok) throw new Error(response.status);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
