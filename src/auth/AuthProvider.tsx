import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { getUserSaga } from './saga';
import { actions, reducer, selectAuthState, sliceKey } from './slice';

export const AuthProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: getUserSaga });
  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);

  if (authState === 'fetchingInfo') {
    dispatch(actions.fetchUserData());
  }
  const { children } = props;

  return <React.Fragment>{React.Children.only(children)}</React.Fragment>;
};
