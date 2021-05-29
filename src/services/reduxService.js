import reduxStore from 'utils/store';

export function getState() {
  return reduxStore.store.getState();
}
