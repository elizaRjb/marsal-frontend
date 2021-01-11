import { SET_AUTH_TOKENS, SET_LOGIN_DETAILS } from 'actions/auth';

const INITIAL_STATE = null;

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH_TOKENS: {
      const { token } = action;

      return { ...state, token };
    }
    case SET_LOGIN_DETAILS: {
      const { isLoggedIn } = action;

      return { ...state, isLoggedIn };
    }
    default:
      return state;
  }
}
