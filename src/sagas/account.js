/* eslint-disable no-console */
import { takeLatest, call, all, put } from 'redux-saga/effects';

import AccountApi from 'api/account';

import { setAuthTokens, setLoginDetails } from 'actions/auth';
import { USER_SIGNUP_REQUEST, setAccountDetails } from 'actions/account';

function* handleUserSignupRequest(action) {
  const { data, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(AccountApi.signup, data);

    if (!res) {
      throw new Error('connection error');
    }

    if ('error' in res) {
      throw new Error(res.error);
    }

    yield put(setAccountDetails(res.data.data.userInfo));
    yield put(setAuthTokens(res.data.data.token));
    yield put(setLoginDetails(true));

    if (callbackSuccess) {
      callbackSuccess();
    }
  } catch (e) {
    const errMsg = `User Signup Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.response.data.error);
    }
  }
}

/**
 * For user signup.
 */
function* watchUserSignupRequest() {
  yield takeLatest(USER_SIGNUP_REQUEST, handleUserSignupRequest);
}

/**
 * Sagas for account.
 */
export default function* accountSaga() {
  yield all([watchUserSignupRequest()]);
}
