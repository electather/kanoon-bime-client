import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UserData, UserDataMinimal } from 'userResponse';
import { getBearerToken } from 'utils';
import { request } from 'utils/request';

import { actions } from './slice';
import { QuerySchema } from './types';

export function* fetchList({ payload }: PayloadAction<QuerySchema>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: getBearerToken(),
      },
    };

    const response: UserDataMinimal = yield call(
      request,
      `users`,
      options,
      payload,
    );
    yield put(actions.fetchStatsDone(response));
  } catch (err) {
    console.log(err);
    if (err.response?.status) {
      yield put(actions.requestFailed(err.response));
    }
  }
}

export function* fetchById({ payload }: PayloadAction<string>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: getBearerToken(),
      },
    };

    const response: UserData = yield call(request, `users/${payload}`, options);
    yield put(actions.fetchExpiryListDone(response));
  } catch (err) {
    console.log(err);
    if (err.response?.status) {
      yield put(actions.requestFailed(err.response));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* usersSaga() {
  // Watches for fetchUserData actions and calls getUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(actions.fetchStats.type, fetchList),
    takeLatest(actions.fetchExpiryList.type, fetchById),
  ]);
}
