export const getAccountInfo = state => state.accountInfo;

export const getFullName = state => {
  const accountInfo = getAccountInfo(state);

  if (!accountInfo) {
    return '';
  }

  return accountInfo.name;
};

export const getEmail = state => {
  const accountInfo = getAccountInfo(state);

  if (!accountInfo) {
    return '';
  }

  return accountInfo.email;
};

export const getUserId = state => {
  const accountInfo = getAccountInfo(state);

  if (!accountInfo) {
    return '';
  }

  return accountInfo.userId;
};

export const getUserColorScheme = state => {
  const accountInfo = getAccountInfo(state);

  if (!accountInfo) {
    return '';
  }

  return accountInfo.colorScheme;
};
