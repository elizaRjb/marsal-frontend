export const getAuth = state => state.auth;

export const getIsLoggedIn = state => {
  const auth = getAuth(state);

  if (!auth) {
    return;
  }

  return auth.isLoggedIn;
};

export const getAccessToken = state => {
  const auth = getAuth(state);

  if (!auth || !auth.token) {
    return '';
  }

  return auth.token.accessToken;
};
