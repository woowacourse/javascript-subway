import { ERROR_MESSAGE } from '../utils/constants';
import { httpClient } from '../api/httpClient';
import token from '../token/Token';

export const requestEmailDuplicationCheck = async (email) => {
  try {
    const response = await httpClient.get({ path: `/members/check-validation?email=${email}` });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_EMAIL);
  }
};

export const requestGetToken = async ({ email, password }) => {
  try {
    const response = await httpClient.post({ path: '/login/token', body: { email, password } });
    if (!response.ok) {
      throw await response.text();
    }

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

export const requestSignUpApprove = async ({ email, name, password }) => {
  try {
    const response = await httpClient.post({ path: '/members', body: { email, password, name } });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.SIGN_UP_FAIL);
  }
};

export const requestAddStation = async ({ name }) => {
  try {
    const response = await httpClient.post({ path: '/stations', body: { name }, accessToken: token.accessToken });
    if (!response.ok) {
      throw await response.text();
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const requestEditStationName = async ({ id, name }) => {
  try {
    const response = await httpClient.put({ path: `/stations/${id}`, body: { name }, accessToken: token.accessToken });
    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const requestRemoveStation = async ({ id }) => {
  try {
    const response = await httpClient.delete({ path: `/stations/${id}`, accessToken: token.accessToken });
    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const requestGetStationList = async () => {
  try {
    const response = await httpClient.get({ path: `/stations`, accessToken: token.accessToken });

    if (!response.ok) {
      throw await response.text();
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const requestAddLine = async ({ name, color, upStationId, downStationId, distance, duration }) => {
  try {
    const response = await httpClient.post({
      path: '/lines',
      body: { name, color, upStationId, downStationId, distance, duration },
      accessToken: token.accessToken,
    });
    if (!response.ok) {
      throw await response.text();
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const requestGetLineList = async () => {
  try {
    const response = await httpClient.get({ path: `/lines`, accessToken: token.accessToken });

    if (!response.ok) {
      throw await response.text();
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const requestGetTargetLineList = async ({ id }) => {
  try {
    const response = await httpClient.get({ path: `/lines/${id}`, accessToken: token.accessToken });

    if (!response.ok) {
      throw await response.text();
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const requestEditLineData = async ({ id, name, color }) => {
  try {
    const response = await httpClient.put({
      path: `/lines/${id}`,
      body: { name, color },
      accessToken: token.accessToken,
    });
    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const requestRemoveLine = async ({ id }) => {
  try {
    const response = await httpClient.delete({ path: `/lines/${id}`, accessToken: token.accessToken });
    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const requestAddSection = async ({ id, upStationId, downStationId, distance, duration }) => {
  try {
    const response = await httpClient.post({
      path: `/lines/${id}/sections`,
      body: { upStationId, downStationId, distance, duration },
      accessToken: token.accessToken,
    });

    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const requestRemoveSection = async ({ lineId, stationId }) => {
  try {
    const response = await httpClient.delete({
      path: `/lines/${lineId}/sections?stationId=${stationId}`,
      accessToken: token.accessToken,
    });

    if (!response.ok) {
      throw await response.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};
