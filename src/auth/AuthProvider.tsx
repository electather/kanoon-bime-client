import React from 'react';
import { useInjectReducer } from 'redux-injectors';

import { reducer, settingsSliceKey } from './slice';

export const AuthProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: settingsSliceKey, reducer: reducer });
  const { children } = props;

  return <React.Fragment>{React.Children.only(children)}</React.Fragment>;
};
