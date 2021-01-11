/* eslint-disable no-console */
import { takeLatest, call, all, put } from 'redux-saga/effects';

import AuthApi from 'api/auth';

import { setAccountDetails } from 'actions/account';
import { USER_LOGIN_REQUEST, setAuthTokens, setLoginDetails } from 'actions/auth';

function* handleUserLoginRequest(action) {
  const { data, callbackSuccess, callbackError } = action;

  try {
    const res = yield call(AuthApi.login, data);

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
    const errMsg = `User Login Request Error: ${e.message}`;

    console.error(errMsg);

    if (callbackError) {
      callbackError(e.response.data.error);
    }
  }
}

function* watchUserLoginRequest() {
  yield takeLatest(USER_LOGIN_REQUEST, handleUserLoginRequest);
}

export default function* authSaga() {
  yield all([watchUserLoginRequest()]);
}
