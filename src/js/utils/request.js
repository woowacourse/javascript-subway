export const request = async ({ uri, method, type, body, headers }) => {
  const response = await fetch(uri, { method, body, headers }).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return type ? response[type]() : response;
  });

  return response;
};
