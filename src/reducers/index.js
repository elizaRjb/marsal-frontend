/* eslint-disable no-console */
import { combineReducers } from 'redux';

import { USER_LOGOUT_REQUEST } from 'actions/auth';

import auth from './auth';
import projects from './projects';
import accountInfo from './account';

const appReducer = combineReducers({
  auth,
  accountInfo,
  projects,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT_REQUEST) {
    state = { accountInfo: {}, auth: { isLoggedIn: false }, projects: {}, tasks: {} };
  }

  return appReducer(state, action);
};

export default rootReducer;
