import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserData, UserResponse } from 'userResponse';
import * as meData from 'utils/mock/auth/me.json';
import { request } from 'utils/request';

import { actions } from './slice';
import { ErrorType, LoginPayload } from './types';
import { setToken } from './utils';
/**
 * Github repos request/response handler
 */
export function* getUser() {
  // const token = getToken();

  console.log(process.env.REACT_APP_MOCK);
  if (process.env.REACT_APP_MOCK) {
    yield put(actions.authSuccess(meData));
    return;
  }
  try {
    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        a: 10,
        b: 20,
      }),
    };

    const response: UserData = yield call(request, 'auth/login', options);
    yield put(actions.authSuccess(response));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.authFailure(ErrorType.USER_NOT_FOUND));
    }
  }
}

export function* loginUser({ payload }: PayloadAction<LoginPayload>) {
  // const token = getToken();
  if (process.env.REACT_APP_MOCK) {
    // yield put(actions.authSuccess({ id: '1', name: 'omid' }));
    setToken('ss');
    return;
  }
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    };

    const response: UserResponse = yield call(request, 'auth/login', options);
    yield put(actions.authSuccess(response.user));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.authFailure(ErrorType.USER_NOT_FOUND));
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
  yield takeLatest(actions.login.type, loginUser);
}
