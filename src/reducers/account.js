import { SET_ACCOUNT_DETAILS } from 'actions/account';

const INITIAL_STATE = null;

export default function accountInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ACCOUNT_DETAILS: {
      const { details } = action;

      return { ...state, ...details };
    }
    default:
      return state;
  }
}
