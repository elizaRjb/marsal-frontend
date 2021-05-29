import { all } from 'redux-saga/effects';

import authSaga from './auth';
import taskSaga from './tasks';
import accountSaga from './account';
import projectSaga from './projects';

export default function* rootSaga() {
  yield all([accountSaga(), authSaga(), projectSaga(), taskSaga()]);
}
