export const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';
export const SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';

export function setAuthTokens(token) {
  return {
    type: SET_AUTH_TOKENS,
    token,
  };
}

export function setLoginDetails(isLoggedIn) {
  return {
    type: SET_LOGIN_DETAILS,
    isLoggedIn,
  };
}

export function userLoginRequest(data, callbackSuccess = null, callbackError = null) {
  return {
    type: USER_LOGIN_REQUEST,
    data,
    callbackSuccess,
    callbackError,
  };
}

export function userLogoutRequest() {
  return {
    type: USER_LOGOUT_REQUEST,
  };
}
