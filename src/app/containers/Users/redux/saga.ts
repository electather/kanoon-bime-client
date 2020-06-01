import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CreateUser } from 'userRequest';
import { UserData, UsersPage } from 'userResponse';
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

    const response: UsersPage = yield call(request, `users`, options, payload);
    yield put(actions.fetchDone(response));
  } catch (err) {
    console.log(err);
    if (err.response?.status) {
      yield put(actions.requestFailed(err.response));
    }
  }
}

export function* createUser({ payload }: PayloadAction<CreateUser>) {
  if (process.env.REACT_APP_MOCK === 'true') {
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: getBearerToken(),
      },
      body: JSON.stringify(payload),
    };

    const response: UserData = yield call(request, `users`, options);
    yield put(actions.createDone(response));
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
    yield put(actions.fetchByIdDone(response));
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
    takeLatest(actions.fetchList.type, fetchList),
    takeLatest(actions.create.type, createUser),
    takeLatest(actions.fetchById.type, fetchById),
  ]);
}
