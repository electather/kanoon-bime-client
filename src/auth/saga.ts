import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserData, UserResponse } from 'userResponse';
import meData from 'utils/mock/auth/me.json';
import { request } from 'utils/request';

import { actions } from './slice';
import { ErrorType, LoginPayload } from './types';
import { getBearerToken, setToken } from './utils';

/**
 * Github repos request/response handler
 */
export function* getUser() {
  console.log('react app mock', process.env.REACT_APP_MOCK);
  if (process.env.REACT_APP_MOCK === true) {
    yield put(actions.authSuccess(meData));
    return;
  }
  try {
    console.log('reached here');

    // Call our request helper (see 'utils/request')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: getBearerToken(),
      },
    };

    const response: UserData = yield call(request, 'auth/me', options);
    yield put(actions.authSuccess(response));
  } catch (err) {
    switch (err.response?.status) {
      case 404:
        yield put(actions.authFailure(ErrorType.USER_NOT_FOUND));
        break;
      case 401:
        yield put(actions.authFailure(ErrorType.USER_NOT_AUTHORIZED));
        break;
      default:
        yield put(actions.authFailure(ErrorType.RESPONSE_ERROR));
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
    console.log('reached here', payload);

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
