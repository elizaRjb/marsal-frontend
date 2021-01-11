import http from 'utils/http';

import { getAccessToken } from 'selectors/auth';

import { getState } from 'services/reduxService';

export function getAuthenticatedHeaders() {
  const BASE_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const accessToken = getAccessToken(getState());

  const authToken = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return { ...BASE_HEADERS, ...authToken };
}

/**
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 */
export async function request(url, method = 'get', data) {
  const requestBody = data ? { data: { ...data } } : null;

  const headers = getAuthenticatedHeaders();

  const config = {
    url,
    method,
    headers,
    data: requestBody,
  };

  const res = await http.request(config);

  return res;
}
