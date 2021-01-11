export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const SET_ACCOUNT_DETAILS = 'SET_ACCOUNT_DETAILS';

/**
 * @param {Object} data
 * @param {Function} callbackSuccess
 * @param {Function} callbackError
 */
export function userSignupRequest(data, callbackSuccess = null, callbackError = null) {
  return {
    type: USER_SIGNUP_REQUEST,
    data,
    callbackSuccess,
    callbackError,
  };
}

export function setAccountDetails(details) {
  return {
    type: SET_ACCOUNT_DETAILS,
    details,
  };
}
