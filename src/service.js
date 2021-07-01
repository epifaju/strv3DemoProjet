import { startGetUser, succeedGetUser, failGetUser } from '~/actions.js';
import { fetchUser } from './client';

export function init(store) {

  observeStore(store, state => state.location, async function (_, newValue) {
    if (newValue === 'info' && !store.getState().user) {
      await getUser(store.dispatch, store.getState);
    }
  });

};

async function getUser(dispatch, getState) {
  dispatch(startGetUser());
  try {
    const response = await fetchUser();
    dispatch(succeedGetUser(response));
  } catch (err) {
    dispatch(failGetUser(err));
  }
}

function observeStore(store, select, onChange) {
  let currentState = select(store.getState());
  async function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      const oldState = currentState;
      currentState = nextState;
      await onChange(oldState, nextState);
    }
  }
  const unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
}
