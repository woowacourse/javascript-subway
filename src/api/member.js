export const requestSignUp = async (email, name, password) => {
  try {
    const response = await fetch(`${API_END_POINT}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, name, password }),
    });

    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};
