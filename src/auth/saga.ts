import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UserData, UserResponse } from 'userResponse';
import { clearToken, getBearerToken, setToken } from 'utils';
import meData from 'utils/mock/auth/me.json';
import { request } from 'utils/request';

import { actions } from './slice';
import { ErrorType, LoginPayload } from './types';

/**
 * Github repos request/response handler
 */
export function* getUser() {
  if (process.env.REACT_APP_MOCK === 'true') {
    yield put(actions.authSuccess(meData));
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

    const response: UserData = yield call(request, 'auth/me', options);
    yield put(actions.authSuccess(response));
  } catch (err) {
    switch (err.response?.status) {
      case 404:
        yield put(actions.authFailure(ErrorType.USER_NOT_FOUND));
        break;
      case 401:
        yield put(actions.authFailure(ErrorType.USER_NOT_AUTHORIZED));
        clearToken();
        break;
      default:
        yield put(actions.authFailure(ErrorType.RESPONSE_ERROR));
    }
  }
}

export function* loginUser({ payload }: PayloadAction<LoginPayload>) {
  // const token = getToken();
  if (process.env.REACT_APP_MOCK === 'true') {
    yield put(actions.authSuccess(meData));
    setToken('testToken');
    return;
  }
  try {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response: UserResponse = yield call(request, 'auth/login', options);
    setToken(response.token.accessToken);

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
  yield all([
    takeLatest(actions.fetchUserData.type, getUser),
    takeLatest(actions.login.type, loginUser),
  ]);
}
