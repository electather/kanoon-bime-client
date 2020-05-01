import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import { actions } from './slice';
import { ErrorType, UserData } from './types';

/**
 * Github repos request/response handler
 */
export function* getUser() {
  // const token = getToken();

  const requestURL = `someURL`;
  if (process.env.REACT_APP_MOCK) {
    yield put(actions.fetchUserDataSuccess({ id: '1', name: 'omid' }));
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const user: UserData = yield call(request, requestURL);
    yield put(actions.fetchUserDataSuccess(user));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.fetchUserDataFailure(ErrorType.USER_NOT_FOUND));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getUserSaga() {
  // Watches for fetchUserData actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.fetchUserData.type, getUser);
}
